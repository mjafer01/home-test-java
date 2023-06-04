import React from "react";
import shortid from "shortid";
import UserContextProps from "../types/UserContextProps";
const { createContext, useState } = React;

const initialProps = {
  isLogin: false,
  session: "",
  expiredDate: "",
  account: {
    accountID: 0,
    firstName: "",
    lastName: "",
  },
  accountLogin: {
    accountID: 0,
    email: "",
    lastLogin: "",
  },
  accountTypes: [{ accountTypeID: 1 }],
};

export const UserContext = createContext<any>({});

export const UserContextProvider: React.FC<any> = ({ children }) => {
  const [sessionData, setSessionData] =
    useState<typeof initialProps>(initialProps);

  const clearStorage = (): any => {
    localStorage.clear();
  };

  const getUserSession = (): any => {
    const data = localStorage.getItem("UserSessions");
    let userSessions = initialProps;
    if (data) {
      userSessions = JSON.parse(data);
      userSessions.isLogin = true;
    }
    return userSessions;
  };

  const setUserSession = (responseLogin: any): any => {
    localStorage.setItem("UserSessions", JSON.stringify(responseLogin));
    let userSessions = responseLogin;
    userSessions.isLogin = true;
    setSessionData(userSessions);
  };

  return (
    <UserContext.Provider
      value={{
        getUserSession: getUserSession,
        setUserSession: setUserSession,
        clearStorage: clearStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
