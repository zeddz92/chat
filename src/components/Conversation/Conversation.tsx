import Alert from "@mui/material/Alert";
import React, { FC, useContext, useEffect } from "react";

import { ChatContext } from "../../contexts/ChatContext";
import {
  FetchLatestMessagesDocument,
  FetchLatestMessagesQuery,
  useFetchLatestMessagesQuery,
  useFetchMoreMessagesLazyQuery,
} from "../../graphql/types";
import { usePostMessage } from "../../utils/usePostMessage";
import { Loading } from "../Loading";
import { LoadMoreButton } from "../LoadMoreButton";
import { Message } from "../Message";
import { MessageInput } from "./components/MessageInput";

export const Conversation: FC = () => {
  const { channel, user } = useContext(ChatContext);

  const {
    data,
    variables: fetchLatestMessagesVariables,
    loading,
    error,
  } = useFetchLatestMessagesQuery({
    variables: {
      channelId: channel.id,
    },
  });

  const [
    fetchMoreMessages,
    {
      data: moreMessagesData,
      variables: fetchMoreMessagesVariables,
      loading: isFetchingMoreMessages,
      client,
    },
  ] = useFetchMoreMessagesLazyQuery({ fetchPolicy: "network-only" });

  const postMessage = usePostMessage();

  //Merge results from fetchMore to latestMessages cache
  useEffect(() => {
    if (!!moreMessagesData?.fetchMoreMessages?.length && client) {
      const data =
        client.readQuery<FetchLatestMessagesQuery>({
          query: FetchLatestMessagesDocument,
          variables: fetchLatestMessagesVariables,
        })?.fetchLatestMessages || [];

      let messages = [];

      if (fetchMoreMessagesVariables?.old) {
        messages = [...data, ...moreMessagesData.fetchMoreMessages];
      } else {
        messages = [...moreMessagesData.fetchMoreMessages, ...data];
      }

      client.writeQuery({
        query: FetchLatestMessagesDocument,
        variables: fetchLatestMessagesVariables,
        data: {
          fetchLatestMessages: messages,
        },
      });
    }
  }, [client, moreMessagesData]);

  const fetchLatestMessages = data?.fetchLatestMessages || [];

  const shouldShowLoadMoreButton =
    !error || !loading || fetchLatestMessages.length > 0;

  return (
    <div className="flex flex-col w-full h-full border-l border-primary-300 conversation-container">
      <header className="flex items-center chat-header px-4">
        <img src={channel.picture} className="w-10 h-10 rounded-full" />
        <div className="ml-3 font-medium text-white">{channel.name}</div>
      </header>
      {/* When there are 10 or more messages then we know there might be older messages */}
      {shouldShowLoadMoreButton && fetchLatestMessages.length >= 10 && (
        <LoadMoreButton
          direction="UP"
          disabled={isFetchingMoreMessages && fetchMoreMessagesVariables?.old}
          onClick={() => {
            if (data?.fetchLatestMessages) {
              const lastMessageId =
                data.fetchLatestMessages[data.fetchLatestMessages.length - 1]
                  .id;
              fetchMoreMessages({
                variables: {
                  channelId: channel.id,
                  old: true,
                  messageId: lastMessageId,
                },
              });
            }
          }}
        />
      )}

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
      {shouldShowLoadMoreButton && (
        <LoadMoreButton
          disabled={isFetchingMoreMessages && !fetchMoreMessagesVariables?.old}
          onClick={() => {
            if (data?.fetchLatestMessages) {
              const firstMessageId = data.fetchLatestMessages[0].id;
              console.log(firstMessageId);
              fetchMoreMessages({
                variables: {
                  channelId: channel.id,
                  old: false,
                  messageId: firstMessageId,
                },
              });
            }
          }}
        />
      )}
      <MessageInput
        disabled={loading}
        onSubmit={(text) => {
          postMessage({ text });
        }}
      />
    </div>
  );
};
