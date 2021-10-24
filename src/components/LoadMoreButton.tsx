import { CircularProgress } from "@mui/material";
import React, { FC } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import classNames from "classnames";

interface LoadMoreButtonProps {
  direction?: "UP" | "DOWN";
  onClick?(): void;
  disabled?: boolean;
}

export const LoadMoreButton: FC<LoadMoreButtonProps> = ({
  direction = "DOWN",
  onClick,
  disabled,
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
      className="flex justify-center cursor-pointer my-1"
      onClick={onClick}
    >
      <div className={classes}>
        <span className="mr-1">Read more</span>
        <span>
          {direction === "UP" && <ExpandLessIcon />}
          {direction === "DOWN" && <ExpandMoreIcon />}
        </span>
      </div>

      {/* <div className="rounded-full bg-white p-3 flex bg-opacity-50">
        <CircularProgress size={25} />
      </div> */}
    </button>
  );
};
