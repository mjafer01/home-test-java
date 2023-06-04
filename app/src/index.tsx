import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as pageRoutes from "./pages";
ReactDOM.render(
  <App pageRoutes={pageRoutes} />,
  document.getElementById("root")
);
