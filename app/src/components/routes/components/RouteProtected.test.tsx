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
import RouteProtected from "./RouteProtected";
import { GlobalContext, GlobalContextProvider } from "../../contexts";

const testPublicID = shortid.generate();

type ComponentProps = {
  testID: string;
};
const GlobalContextFix = () => {
  const { setUserSession, getUserSession } = React.useContext(GlobalContext);
  const [isLoading, setIsloading] = React.useState("false");
  const loadingStatus = React.useRef({ next: "false", prev: "false" });

  const loadedUser = getUserSession();

  if (loadedUser.isLogged) {
    loadingStatus.current.next = "false";
  } else {
    loadingStatus.current.next = "true";
    setUserSession({});
  }
  if (loadingStatus.current.prev !== loadingStatus.current.next) {
    loadingStatus.current.prev = loadingStatus.current.next;
    setIsloading(loadingStatus.current.next);
  } else if (loadingStatus.current.prev === loadingStatus.current.next) {
    loadingStatus.current.prev =
      loadingStatus.current.next === "false" ? "true" : "false";
  }

  return <>{isLoading}</>;
};
const TestComponent: React.FC<ComponentProps> = ({ testID }) => {
  return <span data-testid={testID}>{testID}</span>;
};

const Props = {
  Component: TestComponent,
  testID: testPublicID,
};

describe("Tests for logic-cf routes  RouteProtected Component", () => {
  it("Success Test", async () => {
    render(
      <GlobalContextProvider>
        <Routes>
          <Route path={"/"} element={<RouteProtected {...Props} />} />
        </Routes>
      </GlobalContextProvider>,
      { wrapper: MemoryRouter }
    );
    await waitFor(() => {
      expect(screen.queryByText("false")).not.toBeInTheDocument();
    });
  });
  it("redirect Test", async () => {
    render(
      <GlobalContextProvider>
        <GlobalContextFix />
        <RouteProtected {...Props} />
      </GlobalContextProvider>,
      { wrapper: MemoryRouter }
    );
    await waitFor(() => {
      expect(screen.queryByText("false")).toBeInTheDocument();
    });
  });

  it("Success Test for optional props", () => {
    render(
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>
            <Route
              path={"/"}
              element={
                <RouteProtected
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
    expect(data).toHaveTextContent(testPublicID);
  });
  it("Redirect Test for optional props", async () => {
    render(
      <GlobalContextProvider>
        <GlobalContextFix />
        <RouteProtected
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
      expect(screen.queryByText("false")).toBeInTheDocument();
    });
  });
  it("Success Test for optional props", async () => {
    render(
      <GlobalContextProvider>
        <RouteProtected
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
      expect(screen.queryByText("false")).not.toBeInTheDocument();
    });
  });
});
