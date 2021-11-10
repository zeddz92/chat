import useLocalStorage from "@rehooks/local-storage";
import React, { Dispatch, FC, SetStateAction, useState } from "react";

import { channels, users } from "../constants";
import { Channel } from "../types/Channel";
import { User } from "../types/User";

interface StateProps {
  user: User;
  channel: Channel;
  drafts: { [key: string]: string };
  switchChannel(channelId: string): void;
  switchUser(userId: string): void;
  updateDraft(text: string): void;
}

const defaultContextValue: StateProps = {
  user: users[0],
  channel: channels[0],
  drafts: {},
  switchChannel: (_: string) => {},
  switchUser: (_: string) => {},
  updateDraft: (_?: string) => {},
};
export const ChatContext = React.createContext(defaultContextValue);

export const ChatProvider: FC = ({ children }) => {
  const [state, setState] = useState(defaultContextValue);

  const switchChannel = (channelId: string) => {
    const channel = channels.find((channel) => channel.id === channelId);
    if (channel) {
      setState({ ...state, channel });
    }
  };

  const switchUser = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      setState({ ...state, user });
    }
  };

  const updateDraft = (text = "") => {
    const { channel } = state;
    setState({ ...state, drafts: { ...state.drafts, [channel.id]: text } });
  };

  return (
    <ChatContext.Provider
      value={{ ...state, switchChannel, switchUser, updateDraft }}
    >
      {children}
    </ChatContext.Provider>
  );
};
