import type { VersionedUrl } from "@blockprotocol/type-system";
import type { PropertyType } from "@local/hash-graph-client";
import type {
  BaseUrl,
  EntityPropertiesObject,
  EntityPropertyValue,
} from "@local/hash-subgraph";
import { extractBaseUrl } from "@local/hash-subgraph/type-system-patch";
import OpenAI from "openai";

import Usage = OpenAI.CreateEmbeddingResponse.Usage;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createEmbeddings = async (params: { input: string[] }) => {
  const response = await openai.embeddings.create({
    input: params.input,
    model: "text-embedding-ada-002",
  });

  return {
    usage: response.usage,
    embeddings: response.data.map((data) => data.embedding),
  };
};

const createPropertyEmbeddingInput = (params: {
  propertyTypeSchema: Pick<PropertyType, "title">;
  propertyValue: EntityPropertyValue;
}): string => {
  return `${params.propertyTypeSchema.title}: ${typeof params.propertyValue === "string" ? params.propertyValue : JSON.stringify(params.propertyValue)}`;
};

/**
 * Creates embeddings for (a) each property and finally (b) a new line-separated list of all properties.
 */
export const createEntityEmbeddings = async (params: {
  entityProperties: EntityPropertiesObject;
  propertyTypes: { title: string; $id: VersionedUrl }[];
}): Promise<{
  embeddings: {
    /** If 'property' is absent, this is the combined embedding for all properties */
    property?: BaseUrl;
    embedding: number[];
  }[];
  usage: Usage;
}> => {
  // sort property types by their base url
  params.propertyTypes.sort((a, b) =>
    extractBaseUrl(a.$id).localeCompare(extractBaseUrl(b.$id)),
  );

  // We want to create embeddings for:
  //   1. Each individual '[Property Title]: [Value]' pair, and
  //   2. A list of all property key:value pairs
  //
  // We use the last item in the array to store the combined 'all properties' list.
  const propertyEmbeddings: string[] = [];
  const usedPropertyBaseUrls: BaseUrl[] = [];
  let combinedEntityEmbedding = "";
  for (const propertyType of params.propertyTypes) {
    const baseUrl = extractBaseUrl(propertyType.$id);

    const property = params.entityProperties[baseUrl];

    if (property === undefined) {
      // `property` could be `null` or `false` as well but that is part of the semantic meaning of the property
      // and should be included in the embedding.
      continue;
    }

    const embeddingInput = createPropertyEmbeddingInput({
      propertyTypeSchema: propertyType,
      propertyValue: property,
    });

    combinedEntityEmbedding += `${embeddingInput}\n`;
    propertyEmbeddings.push(embeddingInput);
    usedPropertyBaseUrls.push(baseUrl);
  }

  if (usedPropertyBaseUrls.length === 0) {
    return {
      embeddings: [],
      usage: {
        prompt_tokens: 0,
        total_tokens: 0,
      },
    };
  }

  const { embeddings, usage } = await createEmbeddings({
    input: [...propertyEmbeddings, combinedEntityEmbedding],
  });

  return {
    usage,
    embeddings: embeddings.map((embedding, idx) => ({
      property: usedPropertyBaseUrls[idx],
      embedding,
    })),
  };
};