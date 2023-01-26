import userDetailsActions from "./actionTypes";

// action creators
export const addUserInfoToGlobalState = (payload: string) => {
  return {
    type: userDetailsActions.POPULATE_USER,
    payload,
  };
};

export const removeUserInfoFromGlobalState = () => {
  return {
    type: userDetailsActions.EMPTY_USER,
  };
};
