import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorIcon from "@mui/icons-material/Error";
import classNames from "classnames";
import { DateTime } from "luxon";
import React, { FC } from "react";

import { users } from "../../constants";
import { MessageFragment } from "../../graphql/types";
import { generateColor } from "../../utils/generateColor";
import { usePostMessage } from "../../utils/usePostMessage";

interface MessageProps extends MessageFragment {
  from?: boolean;
}

export const Message: FC<MessageProps> = ({
  from,
  status,
  error,
  ...message
}) => {
  const { postMessage, loading } = usePostMessage();

  const containerClasses = classNames("max-w-message flex my-1.5 z-10", {
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
          data-testid="message-error"
          className={classNames(" text-red-500 mx-2", {
            "self-start": from,
            "self-end": !from,
          })}
        >
          Couldn't save message, please{" "}
          <button
            disabled={loading}
            className="text-blue-500"
            onClick={() => {
              postMessage({ id: message.id, text: message.text });
            }}
          >
            Retry
          </button>
        </div>
      )}
      <div className={containerClasses} data-testid="message">
        <div className={classes}>
          <div className="p-3 pt-2.5">
            <div
              className={classNames("font-bold text-xs", {
                "text-green-200": !from,
              })}
              style={{ color: from ? generateColor(user?.name) : undefined }}
            >
              {user?.name}
            </div>
            <span className="text-white tracking-wide whitespace-pre-wrap break-word">
              {message.text}
            </span>
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
          alt={user?.name}
          src={user?.picture}
          className="w-6 h-6 mx-2 rounded-full self-end"
        />
      </div>
    </>
  );
};
