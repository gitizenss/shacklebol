import React, { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { tw } from "twind";
import { BlockComponent } from "@hashintel/block-protocol/react";

import { unstable_batchedUpdates } from "react-dom";
import Loader from "./svgs/Loader";
import Pencil from "./svgs/Pencil";
import { BlockProtocolUpdatePayload } from "@hashintel/block-protocol";
import Cross from "./svgs/Cross";

type UploadVideoParamsType = {
  file?: File;
  videoURL?: string;
};

type AppProps = {
  initialSrc?: string;
  initialCaption?: string;
  uploadVideo: (uploadVideo: UploadVideoParamsType) => Promise<{
    src?: string;
    error?: string;
  }>;
  entityId: string;
  entityTypeId?: string;
  htmlVideoProps?: HTMLVideoElement;
};

const placeholderText = "Enter Video URL";
const buttonText = "Embed Video";
const bottomText = "Works with web-supported video formats";

export const Video: BlockComponent<AppProps> = (props) => {
  const {
    initialSrc,
    initialCaption,
    uploadVideo,
    entityId,
    entityTypeId,
    update,
    htmlVideoProps,
  } = props;

  const [stateObject, setStateObject] = useState<{
    src: string;
    loading: boolean;
    errorString: string | null;
  }>({
    src: initialSrc ?? "",
    loading: false,
    errorString: null,
  });

  const isMounted = useRef(true);

  const [inputText, setInputText] = useState("");
  const [captionText, setCaptionText] = useState(initialCaption ?? "");

  const [randomId] = useState(() => `video-input-${uuid()}`);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  function displayError(errorString: string) {
    setStateObject((stateObject) => ({ ...stateObject, errorString }));
  }

  function updateData(src: string | undefined) {
    if (src?.trim()) {
      if (update) {
        const updateAction: BlockProtocolUpdatePayload<{
          initialSrc: string;
          initialCaption: string;
        }> = {
          data: { initialSrc: src, initialCaption: captionText },
          entityId,
        };

        if (entityTypeId) {
          updateAction.entityTypeId = entityTypeId;
        }

        void update([updateAction]);
      }

      setStateObject((stateObject) => ({ ...stateObject, src }));
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { loading } = stateObject;

    event.preventDefault();

    if (loading) {
      return;
    }

    if (inputText?.trim()) {
      setStateObject((stateObject) => ({ ...stateObject, loading: true }));

      void uploadVideo({ videoURL: inputText })
        .then(({ src }) => {
          if (isMounted.current) {
            setStateObject((stateObject) => ({
              ...stateObject,
              loading: false,
            }));

            updateData(src);
          }
        })
        .catch((error) => {
          return displayError(error);
        });
    } else {
      displayError("Please enter a valid video URL or select a file below");
    }
  };

  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files?.[0]) {
      void uploadVideo({ file: files[0] }).then(({ src, error }) => {
        if (isMounted.current) {
          if (error?.trim()) {
            return displayError(error);
          }

          updateData(src);
        }
      });
    }
  };

  const resetComponent = () => {
    unstable_batchedUpdates(() => {
      setStateObject({
        loading: false,
        errorString: null,
        src: "",
      });

      setInputText("");
      setCaptionText("");
    });
  };

  if (stateObject.src?.trim()) {
    return (
      <div className={tw`flex justify-center text-center w-full`}>
        <div className={tw`flex flex-col`}>
          <video
            {...(htmlVideoProps ?? {})}
            controls
            style={{
              maxWidth: "100%",
            }}
            src={stateObject.src}
          />

          <input
            placeholder="Add a caption"
            className={tw`focus:outline-none text-center mt-3`}
            type="text"
            value={captionText}
            onChange={(event) => setCaptionText(event.target.value)}
            onBlur={() => {
              if (update) {
                updateData(stateObject.src);
              }
            }}
          />
        </div>
        <button
          // Tailwind doesn't have this as a class
          // https://github.com/tailwindlabs/tailwindcss/issues/1042#issuecomment-781271382
          style={{ height: "max-content" }}
          onClick={() => {
            resetComponent();
          }}
          className={tw`ml-2 bg-gray-100 p-1.5 border-1 border-gray-300 rounded-sm`}
        >
          <Pencil />
        </button>
      </div>
    );
  }

  return (
    <>
      {stateObject.errorString && (
        <div
          className={tw`w-96 mx-auto mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative`}
          role="alert"
        >
          <div className={tw`mr-5`}>
            <strong className={tw`font-bold`}>Error</strong>
            <span className={tw`block sm:inline ml-2 `}>
              {stateObject.errorString}
            </span>
          </div>
          <span
            onClick={() =>
              setStateObject((stateObject) => ({
                ...stateObject,
                errorString: null,
              }))
            }
            className={tw`absolute top-0 bottom-0 right-0 px-4 py-3`}
          >
            <Cross />
          </span>
        </div>
      )}

      <div
        className={tw`w-96 mx-auto bg-white rounded-sm shadow-md overflow-hidden text-center p-4 border-2 border-gray-200`}
        onDragOver={(event) => {
          event.stopPropagation();
          event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();
          event.stopPropagation();

          const dT = event.dataTransfer;
          const files = dT.files;

          if (files && files.length) {
            // we set our input's 'files' property

            if (files[0].type.search("video") > -1) {
              void uploadVideo({ file: files[0] }).then(({ src, error }) => {
                if (isMounted.current) {
                  if (error?.trim()) {
                    return displayError(error);
                  }

                  updateData(src);
                }
              });
            }
          }
        }}
      >
        <form className={tw`mb-0`} onSubmit={onSubmit}>
          <div>
            <input
              className={tw`px-1.5 py-1 rounded-sm border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring focus:border-blue-300 w-full`}
              onChange={(event) => setInputText(event.target.value)}
              type="url"
              placeholder={placeholderText}
            />
          </div>
          <div>
            <label htmlFor={randomId}>
              <div
                className={tw`my-4 bg-gray-50 border-2 border-dashed border-gray-200 py-4 text-sm text-gray-400 cursor-pointer`}
              >
                Choose a File. <br /> (or Drop it Here)
              </div>
            </label>

            <input
              id={randomId}
              className={tw`hidden`}
              type="file"
              accept="video/*"
              onChange={onFileSelect}
            />
          </div>
          <div className={tw`mt-4`}>
            <button
              className={tw`bg-blue-400 rounded-sm hover:bg-blue-500 focus:bg-blue-600 py-1 text-white w-full flex items-center justify-center`}
              type="submit"
            >
              {stateObject.loading && <Loader />}
              {buttonText}
            </button>
          </div>
          <div className={tw`text-sm text-gray-400 mt-4`}>{bottomText}</div>
        </form>
      </div>
    </>
  );
};
