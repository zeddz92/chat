// import useLocalStorage from "@rehooks/local-storage";
import React, { FC, useContext, useState } from "react";
import { BaseEmoji } from "unicode-emoji";
import { LocalStorageContext } from "../contexts/LocalStorageContext";
import { useLocalStorage } from "../utils/useLocalStorage";

interface EmojiButtonProps {
  data: BaseEmoji;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}
export const EmojiButton: FC<EmojiButtonProps> = ({ data, onClick }) => {
  const [useProfile, setItem] = useContext(LocalStorageContext);
  const [showVariations, setShowVariations] = useState(false);
  return (
    <button
      className="text-3xl"
      onClick={(e) => {
        onClick && onClick(e);
      }}
    >
      {data.emoji}
    </button>
  );
};
