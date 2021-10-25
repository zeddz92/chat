import {
  FetchMoreMessagesDocument,
  FetchMoreMessagesQueryVariables,
} from "../../src/graphql/types";

const defaultVariables = {
  channelId: "1",
  messageId: "4011434512228782567",
  old: true,
};

export const fetchMoreMessagesResult = [
  {
    id: "5298838346567069653",
    userId: "Joyse",
    text: "Fetched more messages",
    datetime: "2021-10-25T00:44:46.388Z",
    __typename: "Message",
  },
];
export const fetchMoreMessagesMock = (
  variables: Partial<FetchMoreMessagesQueryVariables> = {}
) => ({
  request: {
    query: FetchMoreMessagesDocument,
    variables: {
      ...defaultVariables,
      ...variables,
    },
  },
  result: {
    data: {
      fetchMoreMessages: fetchMoreMessagesResult,
    },
  },
});
