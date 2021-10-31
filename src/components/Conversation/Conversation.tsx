import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect } from "react";

import { ChatContext } from "../../contexts/ChatContext";
import {
  FetchLatestMessagesDocument,
  FetchLatestMessagesQuery,
  useFetchLatestMessagesQuery,
  useFetchMoreMessagesLazyQuery,
} from "../../graphql/types";
import { usePostMessage } from "../../utils/usePostMessage";
import { ChannelsMenu } from "../ChannelsMenu";
import { Loading } from "../Loading";
import { LoadMoreButton } from "../LoadMoreButton";
import { Message } from "../Message";
import { MessageInput } from "./components/MessageInput";

export const Conversation: FC = () => {
  const { channel, user } = useContext(ChatContext);

  const router = useRouter();

  const {
    data,
    variables: fetchLatestMessagesVariables,
    loading,
    refetch: refetchLatestMessages,
    error,
  } = useFetchLatestMessagesQuery({
    // Ignore cache on refetch
    nextFetchPolicy: "network-only",
    variables: {
      channelId: channel.id,
    },
  });

  const [
    fetchMoreMessages,
    {
      data: moreMessagesData,
      error: fetchMoreMessagesError,
      variables: moreMessagesVariables,
      loading: isFetchingMoreMessages,
      client,
    },
  ] = useFetchMoreMessagesLazyQuery({ fetchPolicy: "network-only" });

  const { postMessage } = usePostMessage();

  //Merge results from fetchMore to latestMessages cache
  useEffect(() => {
    if (!!moreMessagesData?.fetchMoreMessages?.length && client) {
      const data =
        client.cache.readQuery<FetchLatestMessagesQuery>({
          query: FetchLatestMessagesDocument,
          variables: fetchLatestMessagesVariables,
        })?.fetchLatestMessages || [];

      let messages = [];
      const moreMessagesResult = [...moreMessagesData.fetchMoreMessages];

      if (moreMessagesVariables?.old) {
        messages = [...data, ...moreMessagesResult];
      } else {
        messages = [...moreMessagesResult.reverse(), ...data];
      }

      client.cache.writeQuery({
        query: FetchLatestMessagesDocument,
        variables: fetchLatestMessagesVariables,
        data: {
          fetchLatestMessages: messages,
        },
      });
    }
  }, [client, moreMessagesData]);

  useEffect(() => {
    if (router?.query?.networkError) {
    }
  }, [router?.query?.networkError]);

  const fetchLatestMessages = data?.fetchLatestMessages || [];

  const shouldShowLoadMoreButton = !error && !loading;

  return (
    <div
      className="flex flex-col w-full h-full border-l border-primary-300 conversation-container"
      data-testid="conversation"
    >
      <header className="flex items-center chat-header px-4">
        <ChannelsMenu />
      </header>
      {router?.query?.networkError && (
        <Alert
          className="mx-8 my-2"
          severity="error"
          onClose={() => router.replace("/", {}, { shallow: true })}
        >
          {router.query.networkError}
        </Alert>
      )}
      {/* When there are 10 or more messages then we know there might be older messages */}
      {shouldShowLoadMoreButton && fetchLatestMessages.length >= 10 && (
        <LoadMoreButton
          direction="UP"
          error={
            moreMessagesVariables?.old ? fetchMoreMessagesError : undefined
          }
          data-testid="load-old-messages-button"
          disabled={isFetchingMoreMessages && moreMessagesVariables?.old}
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

      <div className="inline-flex flex-1 px-4 md:px-8 py-4 overflow-y-auto relative flex-col-reverse">
        <div className="top-4 inset-x-8 absolute z-20">
          {error?.graphQLErrors[0] && (
            <Alert data-testid="conversation-graphql-error" severity="error">
              {error?.graphQLErrors[0].message}
            </Alert>
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
          error={
            !moreMessagesVariables?.old ? fetchMoreMessagesError : undefined
          }
          disabled={
            (isFetchingMoreMessages && !moreMessagesVariables?.old) || loading
          }
          onClick={() => {
            if (data?.fetchLatestMessages?.length) {
              const firstMessageId = data.fetchLatestMessages[0].id;

              fetchMoreMessages({
                variables: {
                  channelId: channel.id,
                  old: false,
                  messageId: firstMessageId,
                },
              });
            } else {
              refetchLatestMessages();
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
