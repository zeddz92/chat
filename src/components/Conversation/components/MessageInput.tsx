import HelpIcon from "@mui/icons-material/Help";
import SendIcon from "@mui/icons-material/Send";
import Tooltip from "@mui/material/Tooltip";
import React, { FC, useContext, useRef } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import { ChatContext } from "../../../contexts/ChatContext";
import { UsersMenu } from "../../UsersMenu";
import { EmojiPicker } from "../../EmojiPicker";

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
    <div>
      <EmojiPicker variant="fullWidth" />
      <div className="flex items-center w-full bg-gray-800 py-3 px-6">
        <UsersMenu
          className="self-end pb-1 mr-3 md:mr-4 md:pointer-events-none "
          imgClasses="py-1"
          size="small"
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
          <div className="text-primary-100 text-xl md:text-2xl h-full grid grid-cols-2 gap-3 items-end py-3 md:py-2.5 self-end ml-2">
            <Tooltip
              title={`Use SHIFT + ENTER for new lines. On mobile you can switch users by clicking the user picture`}
            >
              <HelpIcon fontSize="inherit" />
            </Tooltip>
            <button className="flex">
              <EmojiEmotionsIcon />
            </button>
          </div>
        </div>
        <button
          onClick={() => handleSubmit()}
          disabled={disabled}
          className="text-xl md:text-2xl ml-2.5 flex py-3 md-py-2.5 pr-0 px-2 self-end"
        >
          <SendIcon className="text-primary-100" fontSize="inherit" />
        </button>
      </div>
    </div>
  );
};
