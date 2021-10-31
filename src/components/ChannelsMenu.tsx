import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import classNames from "classnames";
import React, { FC, useContext, useState } from "react";

import { channels } from "../constants";
import { ChatContext } from "../contexts/ChatContext";

interface ChannelsMenuProps {
  className?: string;
}

export const ChannelsMenu: FC<ChannelsMenuProps> = ({ className }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { channel, switchChannel } = useContext(ChatContext);

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
        className="w-inherit flex items-center md:pointer-events-none"
        onClick={(e) => handleClick(e)}
      >
        <img
          alt={channel.name}
          src={channel.picture}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div
          className="mx-3 font-medium text-white"
          data-testid="header-channel-name"
        >
          {channel.name}
        </div>

        <KeyboardArrowDownIcon className="text-gray-300 pt-px md:hidden flex" />
      </button>

      <Menu
        anchorEl={anchorEl}
        variant="menu"
        PopoverClasses={{ paper: "my-4 max-h-96" }}
        className="text-xl"
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        {channels.map(({ id, name, picture }) => (
          <MenuItem
            key={id}
            selected={id === channel.id}
            className="py-2"
            onClick={() => switchChannel(id)}
          >
            <img
              className="w-8 h-8 object-cover mr-3 rounded-full"
              src={picture}
            />
            <span>{name}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
