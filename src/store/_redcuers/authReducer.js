import { SET_TOKEN, SET_ADMIN, SET_USER_DATA } from "../_actions/types";

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setAdmin = (admin) => ({
  type: SET_ADMIN,
  admin,
});

export const setUserData = (user) => ({
  type: SET_USER_DATA,
  user,
});

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case SET_ADMIN:
      return {
        ...state,
        admin: action.admin,
      };
    case SET_USER_DATA:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
