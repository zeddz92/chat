import { InMemoryCache } from "@apollo/client";
import { fireEvent, waitFor } from "@testing-library/dom";
import { GraphQLError } from "graphql";

import {
  fetchLatestMessagesMock,
  fetchLatestMessagesResult,
} from "../../../test/__mocks__/fetchLatestMessagesMock";
import {
  fetchMoreMessagesMock,
  fetchMoreMessagesResult,
} from "../../../test/__mocks__/fetchMoreMessagesMock";
import {
  postMessageMock,
  postMessageResult,
} from "../../../test/__mocks__/postMessageMock";
import { render } from "../../../test/utils/render";
import { typePolicies } from "../../graphql/apolloClient";
import { Conversation } from "./Conversation";

jest.mock("react-uid", () => ({
  ...jest.requireActual("react-uid"),
  uid: jest.fn().mockReturnValue("test-id"),
}));

describe("Conversation", () => {
  test("renders", () => {
    const { getByTestId } = render(<Conversation />);
    expect(getByTestId("conversation")).toBeInTheDocument();
  });

  describe("FetchMoreMessages", () => {
    test("fetch older messages", async () => {
      const cache = new InMemoryCache({
        addTypename: false,
        typePolicies,
      });

      const lastMessageId =
        fetchLatestMessagesResult[fetchLatestMessagesResult.length - 1].id;

      const { getByTestId } = await waitFor(() =>
        render(<Conversation />, {
          mocks: [
            fetchLatestMessagesMock,
            fetchMoreMessagesMock({ messageId: lastMessageId }),
          ],
          cache,
        })
      );

      await waitFor(() => fireEvent.click(getByTestId(`load-more-UP`)));
      await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

      const updatedCache = cache.extract();
      const newMessageId = fetchMoreMessagesResult[0].id;

      expect(updatedCache[`Message:${newMessageId}`]?.text).toEqual(
        "Fetched more messages"
      );
    });

    test("fetch newer messages", async () => {
      const cache = new InMemoryCache({
        addTypename: false,
        typePolicies,
      });

      const firstMessageId = fetchLatestMessagesResult[0].id;

      const { getByTestId } = await waitFor(() =>
        render(<Conversation />, {
          mocks: [
            fetchLatestMessagesMock,
            fetchMoreMessagesMock({ messageId: firstMessageId, old: false }),
          ],
          cache,
        })
      );

      //Wait for messages to be loaded
      await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));
      await waitFor(() => fireEvent.click(getByTestId(`load-more-DOWN`)));

      //Wait for more messages to be loaded
      await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

      const updatedCache = cache.extract();
      const newMessageId = fetchMoreMessagesResult[0].id;

      expect(updatedCache[`Message:${newMessageId}`]?.text).toEqual(
        "Fetched more messages"
      );
    });

    test("display error", async () => {
      const firstMessageId = fetchLatestMessagesResult[0].id;

      const { getByTestId } = await waitFor(() =>
        render(<Conversation />, {
          mocks: [
            fetchLatestMessagesMock,
            {
              ...fetchMoreMessagesMock({
                messageId: firstMessageId,
                old: false,
              }),
              result: { errors: [new GraphQLError("Message not found")] },
            },
          ],
        })
      );

      //Wait for messages to be loaded
      await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));
      await waitFor(() => fireEvent.click(getByTestId(`load-more-DOWN`)));

      const error = await waitFor(() => getByTestId(`load-more-error-DOWN`));

      expect(error).toHaveAttribute("aria-label", "Message not found");
    });
  });

  describe("PostMessage", () => {
    test("post message and update cache", async () => {
      const cache = new InMemoryCache({ addTypename: false, typePolicies });

      const { getByTestId } = await waitFor(() =>
        render(<Conversation />, {
          mocks: [fetchLatestMessagesMock, postMessageMock],
          cache,
        })
      );

      const messageInput = getByTestId("message-input");

      fireEvent.change(messageInput, {
        target: { value: "Hello World" },
      });

      await waitFor(() =>
        fireEvent.keyDown(messageInput, {
          key: "Enter",
          code: 13,
          charCode: 13,
        })
      );

      const updatedCache = cache.extract();
      const newMessageId = postMessageResult.id;

      const message = updatedCache[`Message:${newMessageId}`];

      expect(message?.text).toEqual("Hello World");
    });

    test("update message status on error", async () => {
      const cache = new InMemoryCache({ addTypename: false, typePolicies });

      const { getByTestId } = await waitFor(() =>
        render(<Conversation />, {
          mocks: [
            fetchLatestMessagesMock,
            {
              ...postMessageMock,
              result: {
                errors: [new GraphQLError("random error")],
              },
            },
          ],
          cache,
        })
      );

      const messageInput = getByTestId("message-input");

      fireEvent.change(messageInput, {
        target: { value: "Hello World" },
      });

      await waitFor(() =>
        fireEvent.keyDown(messageInput, {
          key: "Enter",
          code: 13,
          charCode: 13,
        })
      );

      const updatedCache = cache.extract();
      expect(updatedCache["Message:temp-id-test-id"]?.status).toEqual("ERROR");
    });
  });

  describe("FetchLatestMessages", () => {
    test("render messages", async () => {
      const { getByText, getAllByTestId } = render(<Conversation />, {
        mocks: [fetchLatestMessagesMock],
      });
      const message = await waitFor(() => getByText("That's cool!"));
      const renderedMessages = getAllByTestId("message");

      expect(message).toBeInTheDocument();
      expect(renderedMessages).toHaveLength(fetchLatestMessagesResult.length);
    });

    test("display graphql error", async () => {
      const { getByTestId } = render(<Conversation />, {
        mocks: [
          {
            ...fetchLatestMessagesMock,
            result: {
              errors: [new GraphQLError("this channel is illegal. 1")],
            },
          },
        ],
      });
      const error = await waitFor(() =>
        getByTestId("conversation-graphql-error")
      );
      expect(error).toHaveTextContent("this channel is illegal. 1");
    });
  });
});
