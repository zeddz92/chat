import classNames from "classnames";
import React, { FC } from "react";

interface ChatProps {
  name: string;
  picture: string;
  selected?: boolean;
  onClick?: () => void;
}

export const Chat: FC<ChatProps> = ({ name, picture, selected, onClick }) => {
  const classes = classNames(
    "flex items-center hover:bg-primary-400 py-2 w-full h-16 cursor-pointer pl-4",
    {
      "bg-primary-400": selected,
    }
  );
  return (
    <div className={classes} onClick={onClick} data-testid="channel">
      <img
        alt={name}
        src={picture}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="flex items-center ml-4 w-full border-t border-primary-300 h-16">
        <div className="mb-px text-white">{name}</div>
      </div>
    </div>
  );
};
