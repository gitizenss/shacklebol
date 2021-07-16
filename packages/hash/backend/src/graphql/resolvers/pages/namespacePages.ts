import {
  QueryNamespacePagesArgs,
  Resolver,
  Visibility,
} from "../../autoGeneratedTypes";
import { DbPage } from "../../../types/dbTypes";
import { GraphQLContext } from "../../context";

export const namespacePages: Resolver<
  Promise<DbPage[]>,
  {},
  GraphQLContext,
  QueryNamespacePagesArgs
> = async (_, { namespaceId }, { dataSources }) => {
  const pages = await dataSources.db.getEntitiesByType({
    accountId: namespaceId,
    type: "Page",
  });
  return pages.map((page) => ({
    ...page,
    id: page.entityId,
    namespaceId: page.accountId,
    visibility: Visibility.Public, // TODO: get from entity metadata
  })) as DbPage[];
};
