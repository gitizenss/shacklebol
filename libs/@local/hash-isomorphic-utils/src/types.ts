import type {
  EntityType,
  PropertyType,
  VersionedUrl,
} from "@blockprotocol/type-system/slim";
import type {
  GetEntitiesRequest as GetEntitiesRequestGraphApi,
  GetEntitySubgraphRequest as GetEntitySubgraphRequestGraphApi,
} from "@local/hash-graph-client";
import type { EntityId, PropertyPath } from "@local/hash-graph-types/entity";
import type { BaseUrl } from "@local/hash-graph-types/ontology";

export type TextToken =
  | {
      tokenType: "text";
      text: string;
      bold?: boolean;
      italics?: boolean;
      underline?: boolean;
      strikethrough?: boolean;
      highlighted?: boolean;
      link?: string;
    }
  | { tokenType: "hardBreak" }
  | {
      tokenType: "mention";
      mentionType:
        | "user"
        | "page"
        | "entity"
        | "property-value"
        | "outgoing-link";
      entityId: EntityId;
      propertyTypeBaseUrl?: BaseUrl;
      linkEntityTypeBaseUrl?: BaseUrl;
    };

export type SystemDefinedProperties = "$schema" | "kind" | "$id";

export type ConstructPropertyTypeParams = Omit<
  PropertyType,
  SystemDefinedProperties
>;
export type ConstructEntityTypeParams = Omit<
  EntityType,
  SystemDefinedProperties
>;

export type GetEntitiesRequest = Omit<
  GetEntitiesRequestGraphApi,
  "conversions"
> & {
  conversions?: { path: PropertyPath; dataTypeId: VersionedUrl }[];
};

export type GetEntitySubgraphRequest = Omit<
  GetEntitySubgraphRequestGraphApi,
  "conversions"
> & {
  conversions?: { path: PropertyPath; dataTypeId: VersionedUrl }[];
};

export type UserPermissions = {
  view: boolean;
  viewPermissions: boolean;
  edit: boolean;
  editMembers: boolean | null;
  editPermissions: boolean;
};

export type UserPermissionsOnEntityType = {
  view: boolean;
  edit: boolean;
  instantiate: boolean;
};

export type UserPermissionsOnEntities = {
  [key: EntityId]: UserPermissions | undefined;
};

export const isNotNullish = <T>(value: T): value is NonNullable<T> => {
  return value !== null && value !== undefined;
};
