import { PostMessageDocument } from "../../src/graphql/types";

export const postMessageResult = {
  id: "2678724459563763384",
  userId: "Sam",
  text: "Hello World",
  datetime: "2021-10-24T12:49:44.901623Z",
  __typename: "Message",
};

export const postMessageMock = {
  request: {
    query: PostMessageDocument,
    variables: {
      userId: "Sam",
      text: "Hello World",
      channelId: "1",
    },
  },
  result: {
    data: {
      postMessage: postMessageResult,
    },
  },
};
