import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Router,
  MemoryRouter,
} from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import shortid from "shortid";
import RoutePrivate from "./RoutePrivate";
import { GlobalContext, GlobalContextProvider } from "../../contexts";

const testPublicID = shortid.generate();

type ComponentProps = {
  testID: string;
};
const GlobalContextFix = () => {
  const { setUserSession } = React.useContext(GlobalContext);
  const [isLoading, setIsloading] = React.useState("loading");
  useEffect(() => {
    setUserSession({});
    setIsloading("done loading");
  }, []);
  return <>{isLoading}</>;
};
const TestComponent: React.FC<ComponentProps> = ({ testID }) => {
  return <span data-testid={testID}>{testID}</span>;
};

const Props = {
  Component: TestComponent,
  testID: testPublicID,
};

describe("Tests for logic-cf routes  AltXPrivateRoute Component", () => {
  it("false Test", () => {
    render(
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>
            <Route path={"/"} element={<RoutePrivate {...Props} />} />
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    );
    const data = screen.queryByTestId(testPublicID);
    expect(data).not.toBeInTheDocument();
  });
  it("Success Test", async () => {
    render(
      <GlobalContextProvider>
        <GlobalContextFix />
        <RoutePrivate {...Props} />
      </GlobalContextProvider>,
      { wrapper: MemoryRouter }
    );
    await waitFor(() => {
      expect(screen.queryByText("done loading")).toBeInTheDocument();
    });
    const data = screen.getByTestId(testPublicID);
    expect(data).toHaveTextContent(testPublicID);
  });

  it("false Test for optional props", () => {
    render(
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>
            <Route
              path={"/"}
              element={
                <RoutePrivate
                  {...Props}
                  urlProps={{ error: "error" }}
                  componentProps={{
                    component: { pageTitle: testPublicID },
                    layout: { pageTitle: testPublicID },
                  }}
                />
              }
            />
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    );
    const data = screen.queryByTestId(testPublicID);
    expect(data).not.toBeInTheDocument();
  });
  it("Success Test for optional props", async () => {
    render(
      <GlobalContextProvider>
        <GlobalContextFix />
        <RoutePrivate
          {...Props}
          urlProps={{ error: "error" }}
          componentProps={{
            component: { pageTitle: testPublicID },
            layout: { pageTitle: testPublicID },
          }}
        />
      </GlobalContextProvider>,
      { wrapper: MemoryRouter }
    );
    await waitFor(() => {
      expect(screen.queryByText("done loading")).toBeInTheDocument();
    });
    const data = screen.getByTestId(testPublicID);
    expect(data).toHaveTextContent(testPublicID);
  });
});
