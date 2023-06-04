import React, { useEffect } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import shortid from "shortid";
import RouteError from "./RouteError";
import { GlobalContext, GlobalContextProvider } from "../../contexts";

const testPublicID = shortid.generate();

type ComponentProps = {
  testID: string;
};
const GlobalContextFix = () => {
  const { setUserSession } = React.useContext(GlobalContext);
  useEffect(() => {
    setUserSession({});
  }, []);
  return <></>;
};
const TestComponent: React.FC<ComponentProps> = ({ testID }) => {
  return <span data-testid={testID}>{testID}</span>;
};

const Props = {
  Component: TestComponent,
  testID: testPublicID,
};

describe("Tests for logic-cf routes  AltXErrorRoute Component", () => {
  it("Test for public error type props", () => {
    render(
      <GlobalContextProvider>
        <RouteError {...Props} errorType={"error"} />
      </GlobalContextProvider>
    );
    const data = screen.getByTestId(testPublicID);
    expect(data).toHaveTextContent(testPublicID);
  });
  it("Test for public 404 type props", () => {
    render(
      <GlobalContextProvider>
        <RouteError {...Props} errorType={"404"} />
      </GlobalContextProvider>
    );
    const data = screen.getByTestId(testPublicID);
    expect(data).toHaveTextContent(testPublicID);
  });
  it("Test for private error type props", () => {
    render(
      <GlobalContextProvider>
        <GlobalContextFix />
        <RouteError {...Props} errorType={"error"} />
      </GlobalContextProvider>
    );
    const data = screen.getByTestId(testPublicID);
    expect(data).toHaveTextContent(testPublicID);
  });
  it("Test for private 404 type props", () => {
    render(
      <GlobalContextProvider>
        <GlobalContextFix />
        <RouteError {...Props} errorType={"404"} />
      </GlobalContextProvider>
    );
    const data = screen.getByTestId(testPublicID);
    expect(data).toHaveTextContent(testPublicID);
  });

  it("Test for public error type with optional props", () => {
    render(
      <GlobalContextProvider>
        <RouteError
          {...Props}
          errorType={"error"}
          urlProps={{ error: "error" }}
          componentProps={{
            component: { pageTitle: testPublicID },
            layout: { pageTitle: testPublicID },
          }}
        />
      </GlobalContextProvider>
    );
    const data = screen.getByTestId(testPublicID);
    expect(data).toHaveTextContent(testPublicID);
  });
  it("Test for public 404 type with optional props", () => {
    render(
      <GlobalContextProvider>
        <RouteError
          {...Props}
          errorType={"404"}
          urlProps={{ error: "error" }}
          componentProps={{
            component: { pageTitle: testPublicID },
            layout: { pageTitle: testPublicID },
          }}
        />
      </GlobalContextProvider>
    );
    const data = screen.getByTestId(testPublicID);
    expect(data).toHaveTextContent(testPublicID);
  });
  it("Test for private error type with optional props", () => {
    render(
      <GlobalContextProvider>
        <GlobalContextFix />
        <RouteError
          {...Props}
          errorType={"error"}
          urlProps={{ error: "error" }}
          componentProps={{
            component: { pageTitle: testPublicID },
            layout: { pageTitle: testPublicID },
          }}
        />
      </GlobalContextProvider>
    );
    const data = screen.getByTestId(testPublicID);
    expect(data).toHaveTextContent(testPublicID);
  });
  it("Test for private 404 type with optional props", () => {
    render(
      <GlobalContextProvider>
        <GlobalContextFix />
        <RouteError
          {...Props}
          errorType={"404"}
          urlProps={{ error: "error" }}
          componentProps={{
            component: { pageTitle: testPublicID },
            layout: { pageTitle: testPublicID },
          }}
        />
      </GlobalContextProvider>
    );
    const data = screen.getByTestId(testPublicID);
    expect(data).toHaveTextContent(testPublicID);
  });
});
