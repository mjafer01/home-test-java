import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as RC from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import shortid from "shortid";
import { AltXRoute } from "./";
import { GlobalContextProvider } from "../../contexts";

const testPublicID = shortid.generate();
const testPrivateID = shortid.generate();

type ComponentProps = {
  testID: string;
};
const TestComponent: React.FC<ComponentProps> = ({ testID }) => {
  return <span data-testid={testID}>{testID}</span>;
};

const PublicRouteProps = {
  Component: TestComponent,
  testID: testPublicID,
  componentProps: {
    component: { pageTitle: testPublicID },
    layout: { pageTitle: testPublicID },
  },
  pageTitle: testPublicID + "",
};

const PrivateRouteProps = {
  Component: TestComponent,
  testID: testPrivateID,
  componentProps: {
    component: { pageTitle: testPublicID },
    layout: { pageTitle: testPublicID },
  },
  pageTitle: testPublicID + "",
};

describe("Tests for logic-cf routes  AltxRoute Component", () => {
  it("Test for public props", () => {
    const result = render(<AltXRoute {...PublicRouteProps} type={"Public"} />);
    result.container;
    const data = screen.getByTestId(testPublicID);
    expect(data).toHaveTextContent(testPublicID);
  });

  it("Test for private required props", () => {
    const result = render(
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>
            <Route
              path={"/"}
              element={<AltXRoute {...PrivateRouteProps} type={"Private"} />}
            />
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    );
    result.container;
    const data = screen.queryByText(testPrivateID);
    expect(data).not.toBeInTheDocument();
  });

  it("Test for protected required props", () => {
    render(
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>
            <Route
              path={"/"}
              element={<AltXRoute {...PublicRouteProps} type={"Protected"} />}
            />
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    );
    const data = screen.queryByText(testPrivateID);
    expect(data).not.toBeInTheDocument();
  });

  it("Test for Error required props with error page", () => {
    render(
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>
            <Route
              path={"/"}
              element={
                <AltXRoute
                  {...PublicRouteProps}
                  type={"Error"}
                  errorType={"error"}
                />
              }
            />
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    );
    const data = screen.queryByText(testPrivateID);
    expect(data).not.toBeInTheDocument();
  });
  it("Test for Error required props with 404 page", () => {
    render(
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>
            <Route
              path={"/"}
              element={
                <AltXRoute
                  {...PublicRouteProps}
                  type={"Error"}
                  errorType={"404"}
                />
              }
            />
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    );
    const data = screen.queryByText(testPrivateID);
    expect(data).not.toBeInTheDocument();
  });
});
