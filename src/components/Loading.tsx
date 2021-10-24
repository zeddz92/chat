import CircularProgress from "@mui/material/CircularProgress";
import classNames from "classnames";
import React, { FC } from "react";

interface LoadingProps {
  className?: string;
}

export const Loading: FC<LoadingProps> = ({ className }) => {
  const classes = classNames(
    "flex rounded-full bg-white p-3 bg-opacity-50",
    className
  );
  return (
    <div className={classes}>
      <CircularProgress size={25} />
    </div>
  );
};
