import React from "react";
import { act, render } from "@testing-library/react";
import SelectLoanRange from "../../components/SelectLoanRange";

test("renders SelectLoanRange correctly", () => {
  const setFromDate = jest.fn();
  const setToDate = jest.fn();

  let component = null;

  act(() => {
    component = render(
      <SelectLoanRange setFromDate={setFromDate} setToDate={setToDate} />
    );
  });

  expect(component).toMatchSnapshot();
});
