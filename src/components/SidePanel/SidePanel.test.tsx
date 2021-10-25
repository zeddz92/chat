import { render } from "../../../test/utils/render";
import { channels } from "../../constants";
import { SidePanel } from "./SidePanel";

describe("SidePanel", () => {
  test("renders", () => {
    const { getByTestId } = render(<SidePanel />);
    expect(getByTestId("side-panel")).toBeInTheDocument();
  });

  test("render channels", () => {
    const { getAllByTestId, getByText } = render(<SidePanel />);
    expect(getByText("Technology Channel")).toBeInTheDocument();
    expect(getAllByTestId("channel")).toHaveLength(channels.length);
  });
});
