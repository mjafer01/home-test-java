import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import shortid from "shortid";
import App from "./App";

const testID = shortid.generate();

type ComponentProps = {
  testID: string;
};
const TestComponent: React.FC<ComponentProps> = ({ testID }) => {
  return <span data-testid={testID}>{testID}</span>;
};
const pageRoutes = {
  pageRoutes: {
    path: "/",
    componentRouteProps: {
      Component: TestComponent,
      type: "Public",
      testID: testID,
    },
    name: "page",
  },
};

describe("Tests for App Component", () => {
  it("One Test for All", () => {
    const result = render(<App pageRoutes={pageRoutes} restURL={""} />);
    result.container;
    const data = screen.getByTestId(testID);
    expect(data).toHaveTextContent(testID);
  });
});
