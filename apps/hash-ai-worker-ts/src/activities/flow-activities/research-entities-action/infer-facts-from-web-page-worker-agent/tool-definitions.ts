import type { Subtype } from "@local/advanced-types/subtype";
import dedent from "dedent";

import type { LlmToolDefinition } from "../../../shared/get-llm-response/types";
import type { ToolName } from "./types";

const explanationDefinition = {
  type: "string",
  description: dedent(`
    An explanation of why this tool call is required to satisfy the task,
    and how it aligns with the current plan. If the plan needs to be modified,
    make a call to the "updatePlan" tool instead.
  `),
} as const;

export const toolDefinitions: Record<ToolName, LlmToolDefinition<ToolName>> = {
  getWebPageInnerHtml: {
    name: "getWebPageInnerHtml",
    description: dedent(`
      Get the inner HTML of a web page.
      Do not call this tool for files hosted at a URL, only for web pages.
      You can use the "queryPdf" tool to query a PDF document at a URL instead.
    `),
    inputSchema: {
      type: "object",
      properties: {
        explanation: explanationDefinition,
        url: {
          type: "string",
          description: "The URL of the web page.",
        },
      },
      required: ["url", "explanation"],
    },
  },
  inferFactsFromWebPage: {
    name: "inferFactsFromWebPage",
    description: "Infer facts about entities from a web page.",
    inputSchema: {
      type: "object",
      properties: {
        explanation: explanationDefinition,
        url: {
          type: "string",
          description: "The URL of the web page.",
        },
        // htmlContent: {
        //   type: "string",
        //   description: dedent(`
        //     The HTML content with the relevant sections, paragraphs, tables
        //       or other content from the webpage that describe entities of the requested type(s).

        //     You must not modify the content in any way.

        //     You must include table headers when passing data from a table.

        //     Do not under any circumstance truncate or provide partial text which may lead to missed entities
        //       or properties.

        //     You must provide as much text as necessary to infer all
        //       the required entities and their properties from the web page in a single tool call.

        //     ${
        //       ""
        //       /**
        //        * Note: This was previously included to sometimes improve the unit formatting
        //        * for the inference agent, however this came with the cost that the worker
        //        * agent would frequently truncate text. This has been omitted so that the
        //        * unit inference becomes the responsibility of the inference agent.
        //        */
        //       // For example if the text contains data from a table, you must provide the table
        //       // column names. If the are column names specifying units, you must explicitly
        //       // specify the unit for each value in the table. For example if the column
        //       // specifies a unit in millions (m), append this to each value (e.g. "10 million (m)").

        //       /** Note: the agent doesn't do this even if you ask it to */
        //       // If there are units in the data, you must give a detailed definition for
        //       // each unit and what it means.
        //     }
        //     `),
        // },

        prompt: {
          type: "string",
          description: dedent(`
            A prompt instructing the inference agent which entities should be inferred from the HTML content.
            Do not specify any information of the structure of the entities, as this is predefined by
              the entity type.
          `),
        },
        // /**
        //  * @todo: consider letting the agent set `"unknown"` or `"as many as possible"` as
        //  * an argument here, incase it isn't sure of the number of entities that can be inferred.
        //  */
        // expectedNumberOfEntities: {
        //   type: "number",
        //   description: dedent(`
        //     The expected number of entities which should be inferred from the HTML content.
        //     You should expect at least 1 entity to be inferred.
        //   `),
        // },
      },
      required: [
        "url",
        // "htmlContent",
        "prompt",
        "explanation",
        // "expectedNumberOfEntities",
      ],
    },
  },
  queryPdf: {
    name: "queryPdf",
    description: dedent(`
      Query a PDF document hosted at a URL.
      Use this tool to get relevant text out of a PDF document.
    `),
    inputSchema: {
      type: "object",
      properties: {
        explanation: explanationDefinition,
        fileUrl: {
          type: "string",
          description: "The absolute URL of the PDF document.",
        },
        /**
         * Note: using the argument name `query` here lead to the LLM agent
         * providing very short queries, leading to worse results. Using
         * `description` instead seems to lead to more verbose descriptions
         * of the information being sought, hence better query results.
         */
        description: {
          type: "string",
          description: dedent(`
            A detailed description of the relevant information you are seeking from the PDF document.
            Include keywords, phrases, or the name specific sections you are looking for.
            Use language and terminology that is similar to the content in the PDF document you are seeking.
            If you are looking for specific properties of an entity, name them.
          `),
        },
        exampleText: {
          type: "string",
          description: dedent(`
            An example of the data you are looking for in the PDF document.
            This can be a table, a paragraph, or any other relevant content.
          `),
        },
      },
      required: ["fileUrl", "description", "explanation", "exampleText"],
    },
  },
  /**
   * @todo: consider unifying this with the `inferEntitiesFromWebPage` tool call,
   * ensuring there are no regressions in the agent's ability to infer entities
   * from paginated tables.
   */
  inferFactsFromText: {
    name: "inferFactsFromText",
    description: "Infer facts about entities from text.",
    inputSchema: {
      type: "object",
      properties: {
        explanation: {
          type: "string",
          description: dedent(`
            An explanation of why this tool call is required to satisfy the task,
              and how it aligns with the current plan.

            Provide your step by step thinking for why the provided text is sufficient
              to infer the required entities and links to satisfy the research task.
          `),
          // Potentially also ask why other text is unsuitable
        },
        fileUrl: {
          type: "string",
          description: "The absolute URL of the file where the text is from.",
        },
        text: {
          type: "string",
          description: dedent(`
            The text to infer facts about entities from.

            Include any relevant sections, paragraphs, tables, or other content that describe entities of the requested type(s).

            When including a table, you must include table headers and any other relevant information to help the inference agent understand the data.

            Do not under any circumstance truncate or provide partial text which may lead to missed entities
              or properties.

            You must provide as much text as necessary to infer all the relevant
              facts about the entities and their links in a single tool call.
            `),
        },

        prompt: {
          type: "string",
          description: dedent(`
            A prompt instructing the inference agent which facts about entities
              should be inferred from the HTML content.

            Do not specify any information of the structure of the entities, as this is predefined by
              the entity type.
          `),
        },
        // validAt: {
        //   type: "string",
        //   format: "date-time",
        //   description: dedent(`
        //     A date-time string in ISO 8601 format, representing when the provided text content is valid at.
        //     If you don't know, assume it is the current date and time.
        //     The current time is "${new Date().toISOString()}".
        //   `),
        // },
        // includeExistingEntityIds: {
        //   type: "array",
        //   items: {
        //     type: "string",
        //   },
        //   description: dedent(`
        //     An array of IDs of existing entities that have been provided.
        //     This is required for the inference agent to infer links between
        //       the entities it proposed in the text, and existing entities which
        //       have been provided by the user.
        //   `),
        // },
      },
      required: [
        "explanation",
        "fileUrl",
        "text",
        "prompt",
        // "validAt",
      ],
    },
  },
  complete: {
    name: "complete",
    description: dedent(`
      Complete the inference task.
      You must explain how the task has been completed with the existing submitted facts about entities.
      Do not make this tool call if the research prompt hasn't been fully satisfied.
    `),
    inputSchema: {
      type: "object",
      properties: {
        explanation: explanationDefinition,
      },
      required: ["explanation"],
    },
  },
  terminate: {
    name: "terminate",
    description:
      "Terminate the inference task, because it cannot be completed with the provided tools.",
    inputSchema: {
      type: "object",
      properties: {
        explanation: explanationDefinition,
      },
      required: ["explanation"],
    },
  },
  updatePlan: {
    name: "updatePlan",
    description: dedent(`
      Update the plan for the research task.
      You should call this alongside other tool calls to progress towards completing the task.
    `),
    inputSchema: {
      type: "object",
      properties: {
        explanation: {
          type: "string",
          description: dedent(`
            An explanation of why the plan needs to be updated, and
            how it aligns with the current plan.
          `),
        },
        plan: {
          type: "string",
          description: "The updated plan for the research task.",
        },
      },
      required: ["plan", "explanation"],
    },
  },
};

export type ToolCallArguments = Subtype<
  Record<ToolName, unknown>,
  {
    getWebPageInnerHtml: {
      explanation: string;
      url: string;
    };
    inferFactsFromWebPage: {
      explanation: string;
      url: string;
      // htmlContent: string;
      prompt: string;
      // expectedNumberOfEntities: number;
    };
    submitProposedEntities: {
      explanation: string;
      entityIds: string[];
    };
    updatePlan: {
      explanation: string;
      plan: string;
    };
    complete: {
      explanation: string;
    };
    terminate: {
      explanation: string;
    };
    queryPdf: {
      explanation: string;
      fileUrl: string;
      description: string;
      exampleText: string;
    };
    inferFactsFromText: {
      explanation: string;
      text: string;
      /**
       * @todo H-2728 store the webpage URL from which this file was discovered as part of the provenance on the file entity
       */
      fileUrl: string;
      prompt: string;
      // includeExistingEntityIds?: string[];
    };
  }
>;