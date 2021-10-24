import React, { FC, useContext, useEffect, useState } from "react";

import { ChatContext } from "../../../contexts/ChatContext";

interface MessageInputProps {
  onSubmit: (text: string) => void;
  disabled?: boolean;
}

export const MessageInput: FC<MessageInputProps> = ({ onSubmit, disabled }) => {
  const [text, setText] = useState("");

  const { user, channel, drafts, updateDraft } = useContext(ChatContext);

  useEffect(() => {
    if (drafts[channel.id]) {
      setText(drafts[channel.id]);
    } else {
      setText("");
    }
  }, [channel]);

  useEffect(() => {
    if (text) {
      updateDraft(text);
    }
  }, [text]);
  return (
    <div className="flex items-center w-full bg-gray-800 py-3 px-6">
      <img
        src={user.picture}
        className="w-11 h-11 rounded-full mr-4 flex-shrink-0 object-cover"
      />
      <textarea
        disabled={disabled}
        rows={1}
        autoFocus={true}
        name="message"
        autoComplete="off"
        className="border border-gray-400 rounded-full w-full py-2.5 px-5 resize-none overflow-hidden"
        placeholder={`Type a message as ${user.name}`}
        value={text}
        onChange={(e) => {
          setText(e.currentTarget.value);
        }}
        onKeyDown={(e) => {
          // Remove trailing spaces for the text
          const text = e.currentTarget.value.trim();
          const isEmptyText = text === "";
          const isEnterKeyPressed = e.key === "Enter";

          if ((e.key === " " && isEmptyText) || isEnterKeyPressed) {
            e.preventDefault();
          }
          //TODO: pressing shift key and enter should resize textarea
          if (isEnterKeyPressed && !isEmptyText && !e.shiftKey) {
            onSubmit(text);
            setText("");
            updateDraft("");
          }
        }}
      />
    </div>
  );
};
