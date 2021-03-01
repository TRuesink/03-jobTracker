import axios from "axios";

import {
  AUTH_ERROR,
  AUTH_IN_PROGRESS,
  CREATE_ACTIVITY,
  CREATE_CONTACT,
  CREATE_MEETING,
  CREATE_OPPORTUNITY,
  EDIT_OPPORTUNITY,
  ERROR,
  ERROR_ACTIVITY,
  ERROR_CONTACT,
  ERROR_MEETING,
  ERROR_OPPORTUNITY,
  FETCH_ACTIVITIES,
  FETCH_CONTACTS,
  FETCH_MEETINGS,
  FETCH_OPPORTUNITIES,
  FETCH_OPPORTUNITY,
  GET_ME,
  IN_PROGRESS_ACTIVITY,
  IN_PROGRESS_CONTACT,
  IN_PROGRESS_MEETING,
  IN_PROGRESS_OPPORTUNITY,
  SIGN_OUT,
} from "./types";

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

// ---------------- Opportunity Action Creators ------------------- //

export const fetchOpportunities = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_OPPORTUNITY });
      const response = await axios.get("/api/v1/opportunities");
      dispatch({ type: FETCH_OPPORTUNITIES, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_OPPORTUNITY });
    }
  };
};

export const editOpportunity = (opportunityId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_OPPORTUNITY });
      const response = await axios.put(
        `/api/v1/opportunities/${opportunityId}`,
        formValues
      );
      dispatch({ type: EDIT_OPPORTUNITY, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_OPPORTUNITY });
    }
  };
};

export const fetchOpportunity = (opportunityId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_OPPORTUNITY });
      const response = await axios.get(
        `/api/v1/opportunities/${opportunityId}`
      );
      dispatch({ type: FETCH_OPPORTUNITY, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_OPPORTUNITY });
    }
  };
};

export const createOpportunity = (formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_OPPORTUNITY });
      const response = await axios.post(`/api/v1/opportunities`, formValues);
      dispatch({ type: CREATE_OPPORTUNITY, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_OPPORTUNITY });
    }
  };
};

// ---------------- Activity Action Creators ------------------- //

export const fetchActivities = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_ACTIVITY });
      const response = await axios.get("/api/v1/activities");
      dispatch({ type: FETCH_ACTIVITIES, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_ACTIVITY });
    }
  };
};

export const createActivity = (oppId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_ACTIVITY });
      const response = await axios.post(
        `/api/v1/opportunities/${oppId}/activities`,
        formValues
      );
      dispatch({ type: CREATE_ACTIVITY, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_ACTIVITY });
    }
  };
};

// ---------------- Contact Action Creators ------------------- //

export const fetchContacts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_CONTACT });
      const response = await axios.get("/api/v1/contacts");
      dispatch({ type: FETCH_CONTACTS, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_CONTACT });
    }
  };
};

export const createContact = (oppId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_CONTACT });
      const response = await axios.post(
        `/api/v1/opportunities/${oppId}/contacts`,
        formValues
      );
      dispatch({ type: CREATE_CONTACT, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_CONTACT });
    }
  };
};

// ---------------- Meeting Action Creators ------------------- //

export const fetchMeetings = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_MEETING });
      const response = await axios.get("/api/v1/meetings");
      dispatch({ type: FETCH_MEETINGS, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_MEETING });
    }
  };
};

export const createMeeting = (oppId, formValues) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IN_PROGRESS_MEETING });
      const response = await axios.post(
        `/api/v1/opportunities/${oppId}/meetings`,
        formValues
      );
      dispatch({ type: CREATE_MEETING, payload: response.data });
    } catch (error) {
      dispatch({ type: ERROR_MEETING });
    }
  };
};
