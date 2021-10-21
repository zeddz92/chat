import React, { FC } from "react";

export const Container: FC = ({ children }) => {
  return (
    <div className="max-w-screen-xl w-full h-full mx-auto">{children}</div>
  );
};
