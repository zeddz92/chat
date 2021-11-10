import React, { createContext, FC, useContext } from "react";
import { BaseEmoji } from "unicode-emoji";
import { useLocalStorage } from "../utils/useLocalStorage";
// import { useLocalStorage } from "@rehooks/local-storage";

const defaultProfile: BaseEmoji[] = [];
const defaultContextValue: [
  BaseEmoji[],
  (key: string, value: BaseEmoji[]) => void
] = [defaultProfile, () => {}];

export const LocalStorageContext = createContext(defaultContextValue);

export const LocalStorageProvider: FC = ({ children }) => {
  const ctxValue = useLocalStorage("emoji-picker-recent", defaultProfile);
  console.log({ ctxValue });
  return (
    <LocalStorageContext.Provider value={ctxValue}>
      {children}
    </LocalStorageContext.Provider>
  );
};
