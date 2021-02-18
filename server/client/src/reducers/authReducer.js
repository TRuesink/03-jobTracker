import {
  GET_ME,
  AUTH_IN_PROGRESS,
  AUTH_ERROR,
  SIGN_OUT,
} from "../actions/types";

const authReducer = (state = { user: null, inProgress: false }, action) => {
  switch (action.type) {
    case GET_ME:
      return { user: action.payload.user, inProgress: false };
    case AUTH_IN_PROGRESS:
      return { user: state.user, inProgress: true };
    case SIGN_OUT:
      return { user: null, inProgress: false };
    default:
      return state;
  }
};

export default authReducer;
