import { genEntityId } from "../../../util";
import { DbOrg } from "../../../types/dbTypes";
import {
  MutationCreateOrgArgs,
  Resolver,
  Visibility,
} from "../../autoGeneratedTypes";
import { GraphQLContext } from "../../context";

export const createOrg: Resolver<
  Promise<DbOrg>,
  {},
  GraphQLContext,
  MutationCreateOrgArgs
> = async (_, { shortname }, { dataSources }) => {
  const id = genEntityId();

  const entity = await dataSources.db.createEntity({
    accountId: id,
    entityId: id,
    createdById: genEntityId(), // TODO
    type: "Org",
    properties: { shortname },
  });

  const org: DbOrg = {
    ...entity,
    id: entity.entityId,
    accountId: entity.accountId,
    type: "Org",
    visibility: Visibility.Public, // TODO
  };

  return org;
};
