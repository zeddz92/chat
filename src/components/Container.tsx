import React, { FC } from "react";

export const Container: FC = ({ children }) => {
  return (
    <div className="max-w-desktop w-full h-full mx-auto shadow-lg border border-primary-500">
      {children}
    </div>
  );
};
