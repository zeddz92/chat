import React, { FC } from "react";
import SendIcon from "@mui/icons-material/Send";

import { Message } from "./Message";

export const Messages: FC = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center py-2 bg-gray-200 px-4">
        <img
          src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/2017-11_Haughey_EssentialChannels_FINAL_01_social.png"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-3 font-medium text-gray-800">General Channel</div>
      </div>
      <button>Read more</button>
      <div className="inline-flex flex-1 flex-col px-8 py-4 overflow-y-auto">
        <Message />
        <Message />
        <Message status="SENDING" />
        <Message status="SENT" />
        <Message status="ERROR" from={true} />
        <Message status="SENDING" />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message status="ERROR" from={true} />
        <Message status="SENT" from={true} />
        <Message status="SENT" />
        <Message status="SENT" from={true} />
      </div>
      <button>Read more</button>
      <div className="flex items-center w-full">
        <textarea
          className="border rounded-full w-full p-2 px-4 resize-none"
          placeholder="Type a message"
          rows={1}
          name="message"
          autoComplete="off"
        />
        <button className="flex items-center justify-center ml-2  rounded-full w-11 h-11 border flex-shrink-0 bg-blue-500">
          <SendIcon className="text-white" />
        </button>
      </div>
    </div>
  );
};
