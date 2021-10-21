import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ErrorIcon from "@mui/icons-material/Error";
import classNames from "classnames";
import React, { FC } from "react";

interface MessageProps {
  from?: boolean;
  status?: string;
}

export const Message: FC<MessageProps> = ({ from, status }) => {
  const containerClasses = classNames("max-w-1/2 flex my-1", {
    "self-start flex-row-reverse": from,
    "self-end": !from,
  });
  const classes = classNames("flex w-auto rounded-t-md bg-gray-200 text-sm", {
    "rounded-r-md": from,
    "rounded-l-md": !from,
  });
  return (
    <div className={containerClasses}>
      <div className={classes}>
        <div className="p-3">Test message in this bi</div>
        <div className="flex items-center self-end pr-2 pb-px">
          <div
            className="text-xs text-gray-600"
            style={{ lineHeight: "normal" }}
          >
            8:56
          </div>
          {status && (
            <div className="text-base ml-1">
              {status === "SENDING" && (
                <AccessTimeIcon className="text-gray-500" fontSize="inherit" />
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
        src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
        className="w-5 h-5 mx-2 rounded-full self-end"
      />
    </div>
  );
};
