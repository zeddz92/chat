import { fireEvent, waitFor } from "@testing-library/react";

import Home from "..";
import { render } from "../../../test/utils/render";

describe("Chat page", () => {
  test("renders", () => {
    const { getByTestId } = render(<Home />);
    const chat = getByTestId("chat");
    expect(chat).toBeInTheDocument();
  });

  test("change channel on click", async () => {
    const { getAllByTestId, getByTestId } = render(<Home />);
    const channel = getAllByTestId("channel");

    await waitFor(() => fireEvent.click(channel[1]));
    expect(getByTestId("header-channel-name")).toHaveTextContent(
      "Technology Channel"
    );
  });
});
