import { fireEvent, waitFor } from "@testing-library/react";

import Home from "../pages";
import { render } from "../../test/utils/render";

describe("Chat page", () => {
  test("renders", () => {
    const { getByTestId } = render(<Home />);
    const chat = getByTestId("chat");
    expect(chat).toBeInTheDocument();
  });

  test("change channel on click", async () => {
    const { getByText, getByTestId } = render(<Home />);

    await waitFor(() => fireEvent.click(getByText("Technology Channel")));

    expect(getByTestId("header-channel-name")).toHaveTextContent(
      "Technology Channel"
    );
  });

  test("clear message input on channel change", async () => {
    const { getByTestId, getByText } = render(<Home />);

    const messageInput = getByTestId("message-input");

    fireEvent.change(messageInput, {
      target: { innerText: "Hello World" },
    });

    await waitFor(() => fireEvent.click(getByText("Technology Channel")));
    expect(messageInput).toHaveTextContent("");
  });
});
