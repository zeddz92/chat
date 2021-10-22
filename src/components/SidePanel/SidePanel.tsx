import React, { useContext } from "react";
import { channels } from "../../constants";
import { ChatContext } from "../../contexts/ChatContext";
import { Chat } from "../Chat";
import { SidePanelHeader } from "./components/SidePanelHeader";

export const SidePanel = () => {
  const { channel, updateState } = useContext(ChatContext);
  return (
    <div className="max-w-sidePanel w-full bg-primary-700">
      <SidePanelHeader />

      <div className="w-full mt-2">
        <div className="text-sm text-white px-4 py-1.5 tracking-wide">
          Channels
        </div>
        {channels.map((ch) => (
          <Chat
            key={`channel-${ch.id}`}
            onClick={() => {
              updateState({
                channel: channels.find((channel) => channel.id === ch.id),
              });
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
