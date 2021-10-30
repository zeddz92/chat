import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import classNames from "classnames";
import React, { FC, useContext, useState } from "react";

import { users } from "../constants";
import { ChatContext } from "../contexts/ChatContext";

interface UsersMenuProps {
  size?: "default" | "small";
  className?: string;
  imgClasses?: string;
}

export const UsersMenu: FC<UsersMenuProps> = ({
  size = "default",
  className,
  imgClasses,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, switchUser } = useContext(ChatContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = classNames("flex flex-shrink-0 h-10", className);

  return (
    <div className={classes}>
      <button
        className="w-inherit flex items-center"
        onClick={(e) => handleClick(e)}
      >
        <img
          alt={user.name}
          src={user.picture}
          className={classNames("h-11 rounded-full", imgClasses)}
        />
        {size !== "small" && (
          <>
            <div className="mx-3 font-medium text-white">{user.name}</div>
            <KeyboardArrowDownIcon className="text-gray-300 pt-px flex" />
          </>
        )}
      </button>

      <Menu
        anchorEl={anchorEl}
        variant="menu"
        PopoverClasses={{ paper: "w-48 my-4 max-h-96" }}
        className="text-xl"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        {users.map(({ id, name, picture }) => (
          <MenuItem
            key={id}
            selected={id === user.id}
            className="py-2"
            onClick={() => switchUser(id)}
          >
            <img className="w-8 h-8 object-cover mr-3" src={picture} />
            <span>{name}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
