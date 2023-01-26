import React from "react";
import { createContext, useReducer } from "react";
import userDetailsActions from "./actionTypes";
import userReducer from "./reducer";
import { InitialStateInterface } from "./userInterface";

const userDefaultValue = {
  loggedIn: null,
  userName: "",
};

const initialState = {
  userInfo: userDefaultValue,
};

const UserContext = createContext<InitialStateInterface>(initialState);

export const UserProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(userReducer, userDefaultValue);

  return (
    <UserContext.Provider value={{ userInfo: state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
