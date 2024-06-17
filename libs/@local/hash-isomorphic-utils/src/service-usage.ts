import type { Entity } from "@local/hash-graph-sdk/entity";
import type { BoundedTimeInterval } from "@local/hash-graph-types/temporal-versioning";
import { systemLinkEntityTypes } from "@local/hash-isomorphic-utils/ontology-type-ids";
import { simplifyProperties } from "@local/hash-isomorphic-utils/simplify-properties";
import type {
  ServiceFeatureProperties,
  UsageRecordProperties,
} from "@local/hash-isomorphic-utils/system-types/usagerecord";
import type { EntityRootType, Subgraph } from "@local/hash-subgraph";
import { getOutgoingLinkAndTargetEntities } from "@local/hash-subgraph/stdlib";

export type AggregatedUsageRecord = {
  serviceName: string;
  featureName: string;
  totalInputUnitCount: number;
  totalOutputUnitCount: number;
  totalCostInUsd: number;
  last24hoursTotalCostInUsd: number;
  limitedToPeriod: BoundedTimeInterval | null;
};

const generateAggregateUsageKey = ({
  serviceName,
  featureName,
}: {
  serviceName: string;
  featureName: string;
}) => `${serviceName}:${featureName}`;

export const getAggregateUsageRecords = ({
  decisionTimeInterval,
  serviceUsageRecords,
  serviceUsageRecordSubgraph,
}: {
  decisionTimeInterval?: BoundedTimeInterval;
  serviceUsageRecords: Entity<UsageRecordProperties>[];
  serviceUsageRecordSubgraph: Subgraph<EntityRootType>;
}): AggregatedUsageRecord[] => {
  const aggregateUsageByServiceFeature: Record<string, AggregatedUsageRecord> =
    {};

  for (const record of serviceUsageRecords) {
    const linkedEntities = getOutgoingLinkAndTargetEntities(
      serviceUsageRecordSubgraph,
      record.metadata.recordId.entityId,
    );

    const serviceFeatureLinkAndEntities = linkedEntities.filter(
      ({ linkEntity }) =>
        linkEntity[0]!.metadata.entityTypeId ===
        systemLinkEntityTypes.recordsUsageOf.linkEntityTypeId,
    );
    if (serviceFeatureLinkAndEntities.length !== 1) {
      throw new Error(
        `Expected exactly one service feature link for service usage record ${record.metadata.recordId.entityId}, got ${serviceFeatureLinkAndEntities.length}.`,
      );
    }

    const serviceFeatureEntity = serviceFeatureLinkAndEntities[0]!
      .rightEntity[0]! as Entity<ServiceFeatureProperties>;

    const { featureName, serviceName, serviceUnitCost } = simplifyProperties(
      serviceFeatureEntity.properties,
    );
    if (!serviceUnitCost) {
      throw new Error("Cannot calculate usage cost without service unit cost.");
    }

    const serviceFeatureKey = generateAggregateUsageKey({
      serviceName,
      featureName,
    });

    const { inputUnitCount, outputUnitCount } = simplifyProperties(
      record.properties,
    );

    aggregateUsageByServiceFeature[serviceFeatureKey] ??= {
      serviceName,
      featureName,
      limitedToPeriod: decisionTimeInterval ?? null,
      totalInputUnitCount: 0,
      totalOutputUnitCount: 0,
      totalCostInUsd: 0,
      last24hoursTotalCostInUsd: 0,
    };
    const aggregateUsage = aggregateUsageByServiceFeature[serviceFeatureKey]!;

    aggregateUsage.totalInputUnitCount +=
      inputUnitCount && inputUnitCount >= 0 ? inputUnitCount : 0;
    aggregateUsage.totalOutputUnitCount +=
      outputUnitCount && outputUnitCount >= 0 ? outputUnitCount : 0;

    const applicablePrice = serviceUnitCost.find((entry) => {
      const { appliesUntil, appliesFrom } = simplifyProperties(entry);
      if (
        appliesUntil &&
        appliesUntil <= record.metadata.provenance.createdAtTransactionTime
      ) {
        return false;
      }
      if (!appliesFrom) {
        return false;
      }
      return appliesFrom <= record.metadata.provenance.createdAtTransactionTime;
    });

    if (!applicablePrice) {
      throw new Error(
        `No applicable price found for service feature ${serviceFeatureKey}.`,
      );
    }

    const { inputUnitCost, outputUnitCost } =
      simplifyProperties(applicablePrice);

    const inputCost =
      (inputUnitCount ?? 0) *
      (inputUnitCost && inputUnitCost >= 0 ? inputUnitCost : 0);
    const outputCost =
      (outputUnitCount ?? 0) *
      (outputUnitCost && outputUnitCost >= 0 ? outputUnitCost : 0);
    const totalCost = inputCost + outputCost;

    aggregateUsage.totalCostInUsd += totalCost;

    const oneDayEarlier = new Date(
      new Date().valueOf() - 24 * 60 * 60 * 1000,
    ).toISOString();
    if (record.metadata.provenance.createdAtTransactionTime > oneDayEarlier) {
      aggregateUsage.last24hoursTotalCostInUsd += totalCost;
    }
  }

  return Object.values(aggregateUsageByServiceFeature);
};
