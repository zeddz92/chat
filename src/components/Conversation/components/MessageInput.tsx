import React, { FC, useContext, useRef } from "react";

import { ChatContext } from "../../../contexts/ChatContext";
import SendIcon from "@mui/icons-material/Send";

interface MessageInputProps {
  onSubmit: (text: string) => void;
  disabled?: boolean;
}

export const MessageInput: FC<MessageInputProps> = ({ onSubmit, disabled }) => {
  const { user, channel, drafts, updateDraft } = useContext(ChatContext);

  const inputRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    const text = inputRef.current?.innerText || "";
    if (text.trim() !== "") {
      onSubmit(text.trim());
      inputRef.current!.innerText = "";
      updateDraft("");
    }
  };

  return (
    <div className="flex items-center w-full bg-gray-800 py-3 px-6">
      <img
        alt={user.name}
        src={user.picture}
        className="h-11 rounded-full mr-4 flex-shrink-0 object-cover self-end py-1"
      />

      <div
        ref={inputRef}
        role="textbox"
        contentEditable
        spellCheck="true"
        suppressContentEditableWarning
        placeholder={`Type a message as ${user.name}`}
        className="text-white rounded-3xl bg-primary-400 max-h-32 border border-primary-400 w-full py-2 px-5 outline-none cursor-text overflow-y-auto whitespace-pre-wrap"
        onBlur={(e) => {
          updateDraft(e.currentTarget.innerText);
        }}
        onKeyDown={(e) => {
          const text = e.currentTarget.innerText;
          const isEnterKeyPressed = e.key === "Enter" && !e.shiftKey;

          if (disabled || ((e.key === " " || e.key === "Enter") && !text)) {
            return e.preventDefault();
          }

          if (isEnterKeyPressed && text) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      >
        {drafts[channel.id]}
      </div>
      <button
        onClick={() => handleSubmit()}
        disabled={disabled}
        className="text-2xl ml-2 flex p-2.5 pr-0 self-end"
      >
        <SendIcon className="text-primary-100" fontSize="inherit" />
      </button>
    </div>
  );
};
