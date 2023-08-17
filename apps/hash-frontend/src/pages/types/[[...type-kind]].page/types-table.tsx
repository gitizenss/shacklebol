import { VersionedUrl } from "@blockprotocol/type-system";
import {
  GridCellKind,
  Item,
  SizedGridColumn,
  TextCell,
} from "@glideapps/glide-data-grid";
import {
  DataTypeWithMetadata,
  EntityTypeWithMetadata,
  isExternalOntologyElementMetadata,
  PropertyTypeWithMetadata,
} from "@local/hash-subgraph";
import { Box, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { FunctionComponent, useCallback, useMemo, useState } from "react";

import { Grid } from "../../../components/grid/grid";
import { useOrgs } from "../../../components/hooks/use-orgs";
import { useUsers } from "../../../components/hooks/use-users";
import {
  isLinkEntityType,
  isTypeArchived,
} from "../../../shared/entity-types-context/util";
import { HEADER_HEIGHT } from "../../../shared/layout/layout-with-header/page-header";
import {
  renderTextIconCell,
  TextIconCell,
} from "../../[shortname]/types/entity-type/[...slug-maybe-version].page/entities-tab/text-icon-cell";
import { TOP_CONTEXT_BAR_HEIGHT } from "../../shared/top-context-bar";
import {
  FilterState,
  TypesTableHeader,
  typesTableHeaderHeight,
} from "./types-table/types-table-header";

const typesTableColumnIds = [
  "title",
  "kind",
  "namespaceShortname",
  "archived",
] as const;

type LinkColumnId = (typeof typesTableColumnIds)[number];

type TypesTableColumn = {
  id: LinkColumnId;
} & SizedGridColumn;

type TypesTableRow = {
  rowId: string;
  kind: "entity-type" | "property-type" | "link-type" | "data-type";
  typeId: VersionedUrl;
  title: string;
  external: boolean;
  namespaceShortname?: string;
  archived: boolean;
};

export const TypesTable: FunctionComponent<{
  types: (
    | EntityTypeWithMetadata
    | PropertyTypeWithMetadata
    | DataTypeWithMetadata
  )[];
  kind: "all" | "entity-type" | "property-type" | "link-type" | "data-type";
}> = ({ types, kind }) => {
  const router = useRouter();

  const [filterState, setFilterState] = useState<FilterState>({
    includeArchived: true,
    includeExternal: true,
  });

  const typesTableColumns = useMemo<TypesTableColumn[]>(
    () => [
      {
        id: "title",
        title: "Title",
        width: 250,
        grow: 2,
      },
      ...(kind === "all"
        ? [
            {
              id: "kind",
              title: "Type",
              width: 200,
            } as const,
          ]
        : []),
      {
        id: "namespaceShortname",
        title: "Namespace",
        width: 200,
      },
      {
        id: "archived",
        title: "Archived",
        width: 200,
      },
    ],
    [kind],
  );

  const { users } = useUsers();
  const { orgs } = useOrgs();

  const namespaces = useMemo(
    () => (users && orgs ? [...users, ...orgs] : undefined),
    [users, orgs],
  );

  const filteredRows = useMemo<TypesTableRow[]>(
    () =>
      types
        .map((type) => {
          const isExternal = isExternalOntologyElementMetadata(type.metadata);

          const namespaceAccountId = isExternalOntologyElementMetadata(
            type.metadata,
          )
            ? undefined
            : type.metadata.custom.ownedById;

          const namespace = namespaces?.find(
            ({ accountId }) => accountId === namespaceAccountId,
          );

          return {
            rowId: type.schema.$id,
            typeId: type.schema.$id,
            title: type.schema.title,
            kind:
              type.schema.kind === "entityType"
                ? isLinkEntityType(type.schema)
                  ? "link-type"
                  : "entity-type"
                : type.schema.kind === "propertyType"
                ? "property-type"
                : "data-type",
            external: isExternal,
            namespaceShortname: namespace?.shortname,
            archived: isTypeArchived(type),
          } as const;
        })
        .filter(
          ({ external, archived }) =>
            (filterState.includeExternal ? true : !external) &&
            (filterState.includeArchived ? true : !archived),
        ),
    [types, namespaces, filterState],
  );

  const createGetCellContent = useCallback(
    (rows: TypesTableRow[]) =>
      ([colIndex, rowIndex]: Item): TextCell | TextIconCell => {
        const row = rows[rowIndex];

        if (!row) {
          throw new Error("link not found");
        }

        const column = typesTableColumns[colIndex];

        if (!column) {
          throw new Error("column not found");
        }

        switch (column.id) {
          case "title":
            return {
              kind: GridCellKind.Custom,
              readonly: true,
              allowOverlay: false,
              copyData: row.title,
              cursor: "pointer",
              data: {
                kind: "text-icon-cell",
                icon: "bpAsterisk",
                value: row.title,
                onClick: () => router.push(row.typeId),
              },
            };
          case "kind":
            return {
              kind: GridCellKind.Text,
              readonly: true,
              allowOverlay: false,
              displayData: String(row.kind),
              data: row.kind,
            };
          case "namespaceShortname": {
            const value = row.external
              ? ""
              : row.namespaceShortname
              ? `@${row.namespaceShortname}`
              : "Loading...";

            return {
              kind: GridCellKind.Text,
              readonly: true,
              allowOverlay: false,
              displayData: String(value),
              data: value,
            };
          }
          case "archived": {
            const value = row.archived ? "Yes" : "No";
            return {
              kind: GridCellKind.Text,
              readonly: true,
              allowOverlay: false,
              displayData: String(value),
              data: value,
            };
          }
        }
      },
    [typesTableColumns, router],
  );

  const theme = useTheme();

  return (
    <Box>
      <TypesTableHeader
        types={types}
        filterState={filterState}
        setFilterState={setFilterState}
      />
      <Box
        sx={{
          borderBottomLeftRadius: "6px",
          borderBottomRightRadius: "6px",
          overflow: "hidden",
          boxShadow: "0px 1px 5px 0px rgba(27, 33, 40, 0.07)",
        }}
      >
        <Grid
          columns={typesTableColumns}
          rows={filteredRows}
          sortable
          createGetCellContent={createGetCellContent}
          // define max height if there are lots of rows
          height={
            filteredRows.length > 10
              ? `calc(100vh - (${
                  HEADER_HEIGHT +
                  TOP_CONTEXT_BAR_HEIGHT +
                  170 +
                  typesTableHeaderHeight
                }px + ${theme.spacing(5)}) - ${theme.spacing(5)})`
              : undefined
          }
          customRenderers={[renderTextIconCell]}
        />
      </Box>
    </Box>
  );
};