import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorIcon from "@mui/icons-material/Error";
import classNames from "classnames";
import { DateTime } from "luxon";
import React, { FC } from "react";

import { users } from "../constants";
import { MessageFragment } from "../graphql/types";
import { generateColor } from "../utils/generateColor";
import { usePostMessage } from "../utils/usePostMessage";

interface MessageProps extends MessageFragment {
  from?: boolean;
}

export const Message: FC<MessageProps> = ({
  from,
  status,
  error,
  ...message
}) => {
  const postMessage = usePostMessage();

  const containerClasses = classNames("max-w-1/2 flex my-1.5 z-10", {
    "self-start flex-row-reverse": from,
    "self-end": !from,
  });
  const classes = classNames("flex w-auto rounded-t-md text-sm bg-opacity-60", {
    "rounded-r-md bg-primary-400": from,
    "rounded-l-md bg-green-700": !from,
  });

  const user = users.find((user) => user.id === message.userId);

  return (
    <>
      {error === 500 && (
        <div
          className={classNames(" text-red-500 mx-2", {
            "self-start": from,
            "self-end": !from,
          })}
        >
          Couldn't save message, please{" "}
          <button
            className="text-blue-500"
            onClick={() => {
              postMessage({ id: message.id, text: message.text });
            }}
          >
            Retry
          </button>
        </div>
      )}
      <div className={containerClasses}>
        <div className={classes}>
          <div className="p-3 pt-2.5">
            <div
              className="font-bold text-xs"
              style={{ color: generateColor("R") }}
            >
              {user?.name}
            </div>
            <span className="text-white tracking-wide">{message.text}</span>
          </div>
          <div className="flex items-center self-end pr-2 pb-1">
            <div
              className="text-xs text-gray-300"
              style={{ lineHeight: "normal" }}
            >
              {DateTime.fromISO(message.datetime).toFormat("HH:mm")}
            </div>
            {status && (
              <div className="flex text-base ml-1">
                {status === "SENDING" && (
                  <AccessTimeIcon
                    className="text-gray-500"
                    fontSize="inherit"
                  />
                )}
                {status === "SENT" && (
                  <DoneAllIcon className="text-blue-500" fontSize="inherit" />
                )}
                {status === "ERROR" && (
                  <ErrorIcon className="text-red-500" fontSize="inherit" />
                )}
              </div>
            )}
          </div>
        </div>
        <img
          src={user?.picture}
          className="w-6 h-6 mx-2 rounded-full self-end"
        />
      </div>
    </>
  );
};
