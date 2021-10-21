import React, { FC } from "react";
import classNames from "classnames";

interface ChatProps {
  name: string;
  picture: string;
  selected?: boolean;
}

export const Chat: FC<ChatProps> = ({ name, picture, selected }) => {
  const classes = classNames(
    "flex items-center hover:bg-gray-600 hover:bg-opacity-20 py-2 w-full h-16 cursor-pointer",
    {
      "bg-gray-200": selected,
    }
  );
  return (
    <div className={classes}>
      <img src={picture} className="w-12 h-12 rounded-full object-cover" />
      <div className="flex items-center ml-4 w-full border-t h-16">
        <div className="mb-px text-gray-800">{name}</div>
      </div>
    </div>
  );
};
