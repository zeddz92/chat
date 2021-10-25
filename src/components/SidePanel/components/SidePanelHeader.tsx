import { IconButton, MenuItem, Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import React, { useContext, useEffect, useState } from "react";
import { users } from "../../../constants";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HelpIcon from "@mui/icons-material/Help";
import { ChatContext } from "../../../contexts/ChatContext";

export const SidePanelHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, switchUser } = useContext(ChatContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="flex items-center justify-between w-full chat-header">
      <div>
        <button
          className="w-inherit flex items-center px-4"
          onClick={(e) => handleClick(e)}
        >
          <img
            alt={user.name}
            src={user.picture}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3 mr-3 font-medium text-white">{user.name}</div>
          <KeyboardArrowDownIcon className="text-gray-300 pt-px flex" />
        </button>
      </div>

      <Tooltip title="Change users">
        <IconButton>
          <HelpIcon className="text-gray-300" />
        </IconButton>
      </Tooltip>

      <Menu
        id="program-menu"
        anchorEl={anchorEl}
        variant="menu"
        PopoverClasses={{ paper: "w-32 max-h-96" }}
        className="text-xl"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        {users.map(({ id, name }) => (
          <MenuItem
            key={id}
            selected={id === user.id}
            onClick={() => switchUser(id)}
          >
            <span>{name}</span>
          </MenuItem>
        ))}
      </Menu>
    </header>
  );
};
