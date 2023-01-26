import userDetailsActions from "./actionTypes";
import { UserDefaultValueInterface, ActionInterface } from "./userInterface";

const userReducer = (
  state: UserDefaultValueInterface,
  action: ActionInterface,
) => {
  const { type, payload } = action;
  switch (type) {
    case userDetailsActions.GET_USER_DETAILS:
      return state;

    case userDetailsActions.POPULATE_USER:
      return { loggedIn: true, userName: payload };

    case userDetailsActions.EMPTY_USER:
      return { loggedIn: false, userName: "" };

    default:
      return state;
  }
};

export default userReducer;
