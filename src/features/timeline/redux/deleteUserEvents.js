import {
  TIMELINE_DELETE_USER_EVENTS_BEGIN,
  TIMELINE_DELETE_USER_EVENTS_SUCCESS,
  TIMELINE_DELETE_USER_EVENTS_FAILURE,
  TIMELINE_DELETE_USER_EVENTS_DISMISS_ERROR,
} from './constants';
import {database, TIMELINE} from 'common/firebase';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function deleteUserEvents(args = {}) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: TIMELINE_DELETE_USER_EVENTS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const reqPromise = database.ref(TIMELINE + getState().common.user.uid).remove();
      reqPromise.then(
        (res) => {
          dispatch({
            type: TIMELINE_DELETE_USER_EVENTS_SUCCESS,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: TIMELINE_DELETE_USER_EVENTS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissDeleteUserEventsError() {
  return {
    type: TIMELINE_DELETE_USER_EVENTS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMELINE_DELETE_USER_EVENTS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deleteUserEventsPending: true,
        deleteUserEventsError: null,
      };

    case TIMELINE_DELETE_USER_EVENTS_SUCCESS:
      // The request is success
      return {
        ...state,
        events: [],
        deleteUserEventsPending: false,
        deleteUserEventsError: null,
      };

    case TIMELINE_DELETE_USER_EVENTS_FAILURE:
      // The request is failed
      return {
        ...state,
        deleteUserEventsPending: false,
        deleteUserEventsError: action.data.error,
      };

    case TIMELINE_DELETE_USER_EVENTS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deleteUserEventsError: null,
      };

    default:
      return state;
  }
}
