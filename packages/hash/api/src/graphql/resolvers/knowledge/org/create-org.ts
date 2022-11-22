import { Subgraph } from "@hashintel/hash-subgraph";
import { OrgModel } from "../../../../model";
import { MutationCreateOrgArgs, ResolverFn } from "../../../apiTypes.gen";
import { LoggedInGraphQLContext } from "../../../context";

export const createOrg: ResolverFn<
  Promise<Subgraph>,
  {},
  LoggedInGraphQLContext,
  MutationCreateOrgArgs
> = async (
  _,
  { name, shortname, orgSize, linkResolveDepth, linkTargetEntityResolveDepth },
  { dataSources: { graphApi }, userModel },
) => {
  const orgModel = await OrgModel.createOrg(graphApi, {
    shortname,
    name,
    providedInfo: { orgSize },
    actorId: userModel.entityUuid,
  });

  return await orgModel.getRootedSubgraph(graphApi, {
    linkResolveDepth,
    linkTargetEntityResolveDepth,
  });
};
