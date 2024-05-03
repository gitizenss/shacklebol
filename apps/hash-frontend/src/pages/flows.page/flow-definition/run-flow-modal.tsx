import { IconButton } from "@hashintel/design-system";
import { typedValues } from "@local/advanced-types/typed-entries";
import type {
  FlowDefinition,
  FlowTrigger,
  OutputDefinition,
  StepOutput,
} from "@local/hash-isomorphic-utils/flows/types";
import type { OwnedById } from "@local/hash-subgraph";
import { Box, Stack, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";
import { useState } from "react";

import { XMarkRegularIcon } from "../../../shared/icons/x-mark-regular-icon";
import { Button } from "../../../shared/ui/button";
import { Modal } from "../../../shared/ui/modal";
import { useAuthenticatedUser } from "../../shared/auth-info-context";
import { GoogleAuthProvider } from "../../shared/integrations/google/google-auth-context";
import { ManualTriggerInput } from "./run-flow-modal/manual-trigger-input";
import { WebSelector } from "./run-flow-modal/manual-trigger-input/web-selector";
import type { FormState, LocalPayload } from "./run-flow-modal/types";
import { isSupportedPayloadKind } from "./run-flow-modal/types";

const InputWrapper = ({
  children,
  required,
  label,
}: PropsWithChildren<{ required: boolean; label: string }>) => (
  <Box mb={2.5}>
    <Typography
      component="label"
      variant="smallTextLabels"
      sx={{
        color: ({ palette }) => palette.gray[70],
        fontWeight: 500,
        lineHeight: 1.5,
      }}
    >
      {label}
      {required ? "*" : ""}
      <Box>{children}</Box>
    </Typography>
  </Box>
);

const generateInitialFormState = (outputDefinitions: OutputDefinition[]) =>
  outputDefinitions.reduce<FormState>((acc, outputDefinition) => {
    if (isSupportedPayloadKind(outputDefinition.payloadKind)) {
      let defaultValue: LocalPayload["value"] = "";

      if (outputDefinition.array) {
        defaultValue = [];
      } else if (outputDefinition.payloadKind === "Boolean") {
        defaultValue = false;
      } else if (outputDefinition.payloadKind === "Entity") {
        defaultValue = undefined;
      }

      acc[outputDefinition.name] = {
        outputName: outputDefinition.name,
        payload: {
          kind: outputDefinition.payloadKind satisfies LocalPayload["kind"],
          value: defaultValue satisfies LocalPayload["value"],
        } as LocalPayload,
      };
    }
    return acc;
  }, {});

type RunFlowModalProps = {
  flowDefinition: FlowDefinition;
  open: boolean;
  onClose: () => void;
  runFlow: (outputs: FlowTrigger["outputs"], webId: OwnedById) => void;
};

export const RunFlowModal = ({
  flowDefinition,
  open,
  onClose,
  runFlow,
}: RunFlowModalProps) => {
  const { outputs } = flowDefinition.trigger;

  const { authenticatedUser } = useAuthenticatedUser();

  const [webId, setWebId] = useState<OwnedById>(
    authenticatedUser.accountId as OwnedById,
  );

  const [formState, setFormState] = useState<FormState>(() =>
    generateInitialFormState(outputs ?? []),
  );

  const allRequiredValuesPresent = (outputs ?? []).every((output) => {
    const stateValue = formState[output.name]?.payload.value;
    return (
      !output.required ||
      (output.payloadKind === "Text"
        ? stateValue !== ""
        : stateValue !== undefined)
    );
  });

  const submitValues = () => {
    if (!allRequiredValuesPresent) {
      return;
    }

    const outputValues: FlowTrigger["outputs"] = [];
    for (const { outputName, payload } of typedValues(formState)) {
      if (typeof payload.value !== "undefined") {
        if (Array.isArray(payload.value) && payload.value.length === 0) {
          continue;
        }

        if (payload.kind === "VersionedUrl") {
          outputValues.push({
            outputName,
            payload: {
              kind: payload.kind,
              value: Array.isArray(payload.value)
                ? payload.value.map((entityType) => entityType.schema.$id)
                : payload.value.schema.$id,
            },
          });
        } else {
          const assertedPayload = {
            kind: payload.kind satisfies LocalPayload["kind"],
            value: payload.value satisfies LocalPayload["value"],
          } as StepOutput["payload"]; // this is necessary because TS isn't inferring that payload.value is not undefined

          outputValues.push({
            outputName,
            payload: assertedPayload,
          });
        }
      }
    }

    runFlow(outputValues, webId);
  };

  return (
    <Modal
      contentStyle={{ p: { xs: 0, md: 0 } }}
      open={open}
      onClose={onClose}
      sx={{ zIndex: 1000 }} // Google File Picker has zIndex 1001, MUI Modal default is 1300
    >
      <GoogleAuthProvider>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            borderBottom: ({ palette }) => `1px solid ${palette.gray[20]}`,
            py: 1,
            pl: 2.5,
            pr: 1.5,
          }}
        >
          <Typography
            sx={{ fontWeight: 500, color: ({ palette }) => palette.gray[80] }}
          >
            Run flow
          </Typography>
          <IconButton
            aria-label="Cancel"
            onClick={onClose}
            sx={{ "& svg": { fontSize: 20 } }}
          >
            <XMarkRegularIcon />
          </IconButton>
        </Stack>
        <Box sx={{ px: 4.5, py: 2.5 }}>
          <Typography
            component="p"
            variant="smallTextLabels"
            sx={{
              color: ({ palette }) => palette.gray[70],
              fontWeight: 500,
              lineHeight: 1.5,
              mb: 2.5,
            }}
          >
            In order to run the <strong>{flowDefinition.name}</strong> flow,
            you'll need to provide a bit more information first.
          </Typography>
          {(outputs ?? []).map((outputDef) => {
            if (!isSupportedPayloadKind(outputDef.payloadKind)) {
              throw new Error("Unsupported input kind");
            }

            const payload = formState[outputDef.name]?.payload;

            if (!payload) {
              throw new Error("Missing form state for output");
            }

            return (
              <InputWrapper
                key={outputDef.name}
                label={outputDef.name}
                required={outputDef.required}
              >
                <ManualTriggerInput
                  array={outputDef.array}
                  formState={formState}
                  key={outputDef.name}
                  payload={payload}
                  required={!!outputDef.required}
                  setValue={(newValue) =>
                    setFormState((currentFormState) => ({
                      ...currentFormState,
                      [outputDef.name]: {
                        outputName: outputDef.name,
                        payload: {
                          kind: payload.kind satisfies LocalPayload["kind"],
                          value: newValue satisfies LocalPayload["value"],
                        } as LocalPayload,
                      },
                    }))
                  }
                />
              </InputWrapper>
            );
          })}
          <WebSelector
            selectedWebOwnedById={webId}
            setSelectedWebOwnedById={(newWebId) => setWebId(newWebId)}
          />
          <Button
            disabled={!allRequiredValuesPresent}
            size="small"
            onClick={submitValues}
            sx={{ mt: 1 }}
          >
            Run flow
          </Button>
        </Box>
      </GoogleAuthProvider>
    </Modal>
  );
};
