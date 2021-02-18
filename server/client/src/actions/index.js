import axios from "axios";

import { AUTH_ERROR, AUTH_IN_PROGRESS, GET_ME, SIGN_OUT } from "./types";

// ---------------- Auth Action Creators ------------------- //

export const getMe = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_IN_PROGRESS });
      const response = await axios.get("/api/v1/auth/me");
      dispatch({ type: GET_ME, payload: response.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_IN_PROGRESS });
      const response = await axios.get("/api/v1/auth/logout");
      dispatch({ type: SIGN_OUT, payload: response.data });
    } catch (error) {
      dispatch({ type: AUTH_ERROR });
    }
  };
};
