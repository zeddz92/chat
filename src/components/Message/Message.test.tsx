import { render } from "../../../test/utils/render";
import { Message } from "./Message";

const defaultMessage = {
  id: "id",
  text: "Hello World",
  userId: "Sam",
  datetime: "2021-10-24T12:49:44.901623Z",
};

describe("Message", () => {
  test("renders", () => {
    const { getByTestId } = render(<Message {...defaultMessage} />);
    expect(getByTestId("message")).toBeInTheDocument();
  });

  test("display retry button on error", async () => {
    const { getByTestId } = render(<Message {...defaultMessage} error={500} />);
    const error = getByTestId("message-error");

    expect(error).toHaveTextContent("Couldn't save message, please Retry");
  });
});
