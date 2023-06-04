import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useParams, useSearchParams } from "react-router-dom";
import RouteProtected from "./RouteProtected";
import RoutePrivate from "./RoutePrivate";
import RouteError from "./RouteError";
import AltXRouteProps from "../types/BaseRouteProps";
const BaseRoute: React.FC<AltXRouteProps> = ({
  componentProps,
  pageTitle,
  Component,
  type,
  testID,
  errorType,
}) => {
  const urlProps = useParams();
  const props =
    componentProps && componentProps.component ? componentProps.component : {};
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{pageTitle ? pageTitle : "No title"}</title>
        </Helmet>
        {type === "Protected" && (
          <RouteProtected
            Component={Component}
            componentProps={componentProps}
            urlProps={urlProps}
          />
        )}
        {type === "Private" && (
          <RoutePrivate
            Component={Component}
            componentProps={componentProps}
            urlProps={urlProps}
          />
        )}
        {type === "Error" && (
          <RouteError
            Component={Component}
            componentProps={componentProps}
            errorType={errorType ? errorType : "error"}
            urlProps={urlProps}
          />
        )}
        {type === "Public" && (
          <Component {...props} urlProps={urlProps} testID={testID} />
        )}
      </HelmetProvider>
    </>
  );
};
export default BaseRoute;
