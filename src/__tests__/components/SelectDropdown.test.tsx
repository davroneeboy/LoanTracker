import React from "react";
import { act, render } from "@testing-library/react";
import SelectDropdown from "../../components/SelectDropdown";

const options = [
  { key: "user-1", label: "1: tamato", value: "1" },
  { key: "user-2", label: "2: Austinnn", value: "2" },
  { key: "user-3", label: "3: Andy", value: "3" },
];

jest.mock("next/navigation", () => {
  return {
    useRouter: jest.fn(() => ({
      push: jest.fn(),
    })),
  };
});

test("renders SelectDropdown correctly", () => {
  let component = null;

  act(() => {
    component = render(<SelectDropdown loanId="123" options={options} />);
    expect(component).toMatchSnapshot();
  });

  expect(component).toMatchSnapshot();
});
