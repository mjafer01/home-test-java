import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import shortid from "shortid";
import ArrayRoutes from "./utils/ArrayRoutes";
import { BaseRoute } from "./components/routes";
import { UserContextProvider } from "./contexts/userContext";
import "react-toastify/dist/ReactToastify.css";

type AppProps = {
  pageRoutes: any;
};

const App: React.FC<AppProps> = ({ pageRoutes }) => {
  const RouteArray = ArrayRoutes(pageRoutes);
  const RenderRoutes = () => {
    return (
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <BrowserRouter>
          <UserContextProvider>
            <Routes>
              {RouteArray.map((Data) => (
                <Route
                  key={shortid.generate()}
                  path={Data.path}
                  element={<BaseRoute {...Data.componentRouteProps} />}
                />
              ))}
              <Route path="/" element={<Navigate replace to="/dashboard" />} />
            </Routes>
          </UserContextProvider>
        </BrowserRouter>
        <ToastContainer />
      </StyledEngineProvider>
    );
  };
  return <RenderRoutes />;
};

export default App;
