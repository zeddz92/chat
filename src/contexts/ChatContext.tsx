import React, { Dispatch, FC, SetStateAction, useState } from "react";

import { channels, users } from "../constants";
import { Channel } from "../types/Channel";
import { User } from "../types/User";

interface StateProps {
  user?: User;
  channel?: Channel;
}

const defaultContextValue = {
  user: users[0],
  channel: channels[0],
  updateState: (_: StateProps) => {},
};
export const ChatContext = React.createContext(defaultContextValue);

export const ChatProvider: FC = ({ children }) => {
  const [state, setState] = useState(defaultContextValue);

  const updateState = (value: StateProps) => {
    return setState({ ...state, ...value });
  };

  return (
    <ChatContext.Provider value={{ ...state, updateState }}>
      {children}
    </ChatContext.Provider>
  );
};
