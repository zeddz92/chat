import { IconButton, MenuItem, Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import React, { useContext, useEffect, useState } from "react";
import { users } from "../constants";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HelpIcon from "@mui/icons-material/Help";
import { ChatContext } from "../contexts/ChatContext";

export const UsersMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, updateState } = useContext(ChatContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center justify-between w-full bg-gray-200">
      <div>
        <button
          className="w-inherit flex items-center py-2 px-4"
          onClick={(e) => handleClick(e)}
        >
          <img src={user.picture} className="w-10 h-10 rounded-full" />
          <div className="ml-3 mr-1 font-medium text-gray-800">{user.name}</div>
          {/* <KeyboardArrowDownIcon /> */}
        </button>
      </div>

      <Tooltip title="Change users">
        <IconButton>
          <HelpIcon className="text-gray-400" />
        </IconButton>
      </Tooltip>

      <Menu
        id="program-menu"
        anchorEl={anchorEl}
        variant="menu"
        PopoverClasses={{ paper: "w-auto max-h-96" }}
        className="text-xl"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {users.map(({ id, name }) => (
          <MenuItem
            key={id}
            selected={id == user.id}
            onClick={() =>
              updateState({ user: users.find((user) => user.id === id) })
            }
          >
            <span>{name}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
