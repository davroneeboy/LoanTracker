import { act, render } from "@testing-library/react";
import TopMenu from "../../components/TopMenu";
import "@testing-library/jest-dom";

test("renders TopMenu correctly", () => {
  let component = null;

  act(() => {
    component = render(<TopMenu />);
  });
  expect(component).toMatchSnapshot();
});
