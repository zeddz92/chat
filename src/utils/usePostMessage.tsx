import { DateTime } from "luxon";
import { useContext } from "react";
import { uid } from "react-uid";

import { getMessageStatus } from "../components/Conversation/utils/getMessageStatus";
import { ChatContext } from "../contexts/ChatContext";
import {
  FetchLatestMessagesDocument,
  FetchLatestMessagesQuery,
  MessageFragment,
  usePostMessageMutation,
} from "../graphql/types";

interface Props {
  id?: string;
  text: string;
}
export const usePostMessage = () => {
  const { user, channel } = useContext(ChatContext);

  const [postMessage] = usePostMessageMutation();

  return ({ text, id }: Props) => {
    const sendDate = DateTime.now().toISO();

    const defaultMessage: MessageFragment = {
      __typename: "Message",
      // If an id is supplied it'll attempt to update that message if not it will create a new one
      id: id || `temp-id-${uid(sendDate)}`,
      text: text,
      userId: user.id,
      datetime: sendDate,
    };

    postMessage({
      variables: {
        userId: user.id,
        text: text,
        channelId: channel.id,
      },
      optimisticResponse: {
        __typename: "Mutations",
        postMessage: {
          ...defaultMessage,
          text: text,
          status: "SENDING",
        },
      },
      update: (proxy, { data, errors }, { variables }) => {
        // get cache data of messages for current channel id
        const query = proxy.readQuery<FetchLatestMessagesQuery>({
          query: FetchLatestMessagesDocument,
          variables: {
            channelId: channel.id,
          },
        });

        if (!query?.fetchLatestMessages) {
          return;
        }

        let messages = [];
        // Replace temp message data with response from server
        const message = data?.postMessage || defaultMessage;

        const newMessage = {
          ...message,
          userId: variables?.userId,
          text: variables?.text,
          error: errors && errors[0].extensions?.code,
          status: getMessageStatus(data?.postMessage, errors),
        };

        if (id) {
          // Update message in the cache
          messages = query.fetchLatestMessages.map((message) =>
            message.id === id ? newMessage : message
          );
        } else {
          messages = [newMessage, ...query.fetchLatestMessages];
        }

        proxy.writeQuery({
          query: FetchLatestMessagesDocument,
          variables: {
            channelId: channel.id,
          },
          data: {
            fetchLatestMessages: messages,
          },
        });
      },
    });
  };
};
