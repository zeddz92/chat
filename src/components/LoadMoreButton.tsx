import { ApolloError } from "@apollo/client";
import ErrorIcon from "@mui/icons-material/Error";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tooltip from "@mui/material/Tooltip";
import classNames from "classnames";
import React, { FC } from "react";

interface LoadMoreButtonProps {
  direction?: "UP" | "DOWN";
  onClick?(): void;
  error?: ApolloError;
  disabled?: boolean;
}

export const LoadMoreButton: FC<LoadMoreButtonProps> = ({
  direction = "DOWN",
  onClick,
  disabled,
  error,
}) => {
  const classes = classNames(
    "rounded-md p-2 py-1 flex items-center w-max font-medium bg-blue-500 bg-opacity-70 text-white",
    {
      "bg-gray-100 bg-opacity-30": disabled,
    }
  );
  return (
    <button
      disabled={disabled}
      className="flex justify-center items-center cursor-pointer my-1 relative"
      onClick={onClick}
      data-testid={`load-more-${direction}`}
    >
      <div className="relative flex">
        <div className={classes}>
          <span className="mr-1">Read more</span>
          <span>
            {direction === "UP" && <ExpandLessIcon />}
            {direction === "DOWN" && <ExpandMoreIcon />}
          </span>
        </div>
        {error && (
          <Tooltip
            data-testid={`load-more-error-${direction}`}
            title={error.message}
            className="p-px ml-2 absolute -right-8 inset-y-0 flex justify-center h-full"
          >
            <ErrorIcon className="text-red-500 flex" />
          </Tooltip>
        )}
      </div>
    </button>
  );
};
