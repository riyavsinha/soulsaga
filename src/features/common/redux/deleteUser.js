import {
  COMMON_DELETE_USER_BEGIN,
  COMMON_DELETE_USER_SUCCESS,
  COMMON_DELETE_USER_FAILURE,
  COMMON_DELETE_USER_DISMISS_ERROR,
} from './constants';
import { auth } from 'common/firebase';

export function deleteUser(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_DELETE_USER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const request = auth.currentUser.delete();
      request.then(
        (res) => {
          dispatch({
            type: COMMON_DELETE_USER_SUCCESS,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: COMMON_DELETE_USER_FAILURE,
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
export function dismissDeleteUserError() {
  return {
    type: COMMON_DELETE_USER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_DELETE_USER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deleteUserPending: true,
        deleteUserError: null,
      };

    case COMMON_DELETE_USER_SUCCESS:
      // The request is success
      return {
        ...state,
        user: null,
        signInState: false,
        deleteUserPending: false,
        deleteUserError: null,
      };

    case COMMON_DELETE_USER_FAILURE:
      // The request is failed
      return {
        ...state,
        deleteUserPending: false,
        deleteUserError: action.data.error,
      };

    case COMMON_DELETE_USER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deleteUserError: null,
      };

    default:
      return state;
  }
}
