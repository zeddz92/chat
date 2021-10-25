import { FetchLatestMessagesDocument } from "../../src/graphql/types";

export const fetchLatestMessagesResult = [
  {
    id: "825177546689021441",
    userId: "Sam",
    text: "To prove a point",
    datetime: "2021-10-24T08:00:36.635Z",
    __typename: "Message",
  },
  {
    id: "6649588102858624196",
    userId: "Joyse",
    text: "Yeah",
    datetime: "2021-10-24T07:19:48.163Z",
    __typename: "Message",
  },
  {
    id: "9203291081918955076",
    userId: "Joyse",
    text: "Our bruised arms hung up for monuments",
    datetime: "2021-10-24T07:18:50.252Z",
    __typename: "Message",
  },
  {
    id: "563296524842814658",
    userId: "Sam",
    text: "Made glorious summer by this sun of York",
    datetime: "2021-10-24T07:18:37.273Z",
    __typename: "Message",
  },
  {
    id: "5322032711916380682",
    userId: "Sam",
    text: "Now is the winter of our discontent",
    datetime: "2021-10-24T07:18:35.178Z",
    __typename: "Message",
  },
  {
    id: "2485665239844055034",
    userId: "Russell",
    text: "Now are our brows bound with victorious wreaths",
    datetime: "2021-10-24T07:18:15.819Z",
    __typename: "Message",
  },
  {
    id: "4014123591406351060",
    userId: "Russell",
    text: "Now are our brows bound with victorious wreaths",
    datetime: "2021-10-24T06:54:08.94Z",
    __typename: "Message",
  },
  {
    id: "6690091308451750486",
    userId: "Russell",
    text: "In the deep bosom of the ocean buried",
    datetime: "2021-10-24T06:53:56.666Z",
    __typename: "Message",
  },
  {
    id: "1538043757051245393",
    userId: "Sam",
    text: "And all the clouds that lour'd upon our house",
    datetime: "2021-10-24T06:53:49.987Z",
    __typename: "Message",
  },
  {
    id: "4011434512228782567",
    userId: "Sam",
    text: "That's cool!",
    datetime: "2021-10-24T06:53:45.508Z",
    __typename: "Message",
  },
];

export const fetchLatestMessagesMock = {
  request: {
    query: FetchLatestMessagesDocument,
    variables: {
      channelId: "1",
    },
  },
  result: {
    data: {
      fetchLatestMessages: fetchLatestMessagesResult,
    },
  },
};
