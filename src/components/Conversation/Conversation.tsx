import Alert from "@mui/material/Alert";
import React, { FC, useContext, useEffect } from "react";

import { ChatContext } from "../../contexts/ChatContext";
import { useFetchLatestMessagesQuery } from "../../graphql/types";
import { Loading } from "../Loading";
import { Message } from "../Message";

export const Conversation: FC = () => {
  const { channel, user } = useContext(ChatContext);

  const { data, loading, error } = useFetchLatestMessagesQuery({
    variables: {
      channelId: channel.id,
    },
  });

  return (
    <div className="flex flex-col w-full h-full border-l border-primary-300 conversation-container">
      <header className="flex items-center chat-header px-4">
        <img src={channel.picture} className="w-10 h-10 rounded-full" />
        <div className="ml-3 font-medium text-white">{channel.name}</div>
      </header>

      <div className="inline-flex flex-1 px-8 py-4 overflow-y-auto relative flex-col-reverse">
        <div className="top-4 inset-x-8 absolute z-20">
          {error?.networkError && (
            <Alert severity="error">
              Could not fetch messages try again later. If the problem persist,
              contact support
            </Alert>
          )}
          {error?.graphQLErrors[0] && (
            <Alert severity="error">{error?.graphQLErrors[0].message}</Alert>
          )}
        </div>

        {loading && <Loading className="absolute top-1/2 left-1/2" />}

        {data?.fetchLatestMessages?.map((message, index) => (
          <Message
            {...message}
            key={`message-${message.id}-${index}`}
            from={message.userId !== user.id}
          />
        ))}
      </div>
    </div>
  );
};
