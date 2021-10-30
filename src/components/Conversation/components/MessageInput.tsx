import HelpIcon from "@mui/icons-material/Help";
import SendIcon from "@mui/icons-material/Send";
import Tooltip from "@mui/material/Tooltip";
import React, { FC, useContext, useRef } from "react";

import { ChatContext } from "../../../contexts/ChatContext";

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
        className="h-11 md:h-11 rounded-full mr-3 md:mr-4 flex-shrink-0 object-cover self-end py-1"
      />
      <div className="overflow-hidden whitespace-pre-wrap px-5 relative w-full flex items-center rounded-3xl bg-primary-400  border border-primary-400">
        <div
          data-testid="message-input"
          ref={inputRef}
          role="textbox"
          contentEditable
          onPaste={(e) => {
            e.preventDefault();
            const text = e.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, text);
          }}
          spellCheck="true"
          suppressContentEditableWarning
          placeholder={`Type a message`}
          className="break-all text-white max-h-32 w-full py-2 outline-none cursor-text overflow-y-auto whitespace-pre-wrap"
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
        <Tooltip
          title="Use SHIFT + ENTER for new lines"
          className="h-full flex items-end text-2xl py-2.5 self-end ml-2"
        >
          <div>
            <HelpIcon className="text-primary-100" fontSize="inherit" />
          </div>
        </Tooltip>
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
