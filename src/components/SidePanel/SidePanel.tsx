import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React, { useContext } from "react";

import { channels } from "../../constants";
import { ChatContext } from "../../contexts/ChatContext";
import { Chat } from "../Chat";
import { UsersMenu } from "../UsersMenu";

export const SidePanel = () => {
  const { channel, switchChannel } = useContext(ChatContext);
  return (
    <div
      className="flex flex-col max-w-sidePanel w-full h-full bg-primary-700"
      data-testid="side-panel"
    >
      <header className="flex items-center px-4 justify-between w-full chat-header">
        <UsersMenu />
        <Tooltip title="Change users">
          <IconButton>
            <HelpIcon className="text-gray-300" />
          </IconButton>
        </Tooltip>
      </header>

      <div className="w-full mt-2 overflow-y-auto">
        <div className="text-sm text-white px-4 py-1.5 pb-3 tracking-wide">
          Channels
        </div>
        {channels.map((ch) => (
          <Chat
            key={`channel-${ch.id}`}
            onClick={() => {
              switchChannel(ch.id);
            }}
            name={ch.name}
            picture={ch.picture}
            selected={channel.id === ch.id}
          />
        ))}
      </div>
    </div>
  );
};
