import {
  COMMON_SIGN_OUT_BEGIN,
  COMMON_SIGN_OUT_SUCCESS,
  COMMON_SIGN_OUT_FAILURE,
  COMMON_SIGN_OUT_DISMISS_ERROR,
} from './constants';
import {auth} from 'common/firebase';

export function signOut(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_SIGN_OUT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      auth.signOut()
        .then(
          (res) => {
            dispatch({
              type: COMMON_SIGN_OUT_SUCCESS,
            });
            resolve(res);
          },
          // Use rejectHandler as the second argument so that render errors won't be caught.
          (err) => {
            dispatch({
              type: COMMON_SIGN_OUT_FAILURE,
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
export function dismissSignOutError() {
  return {
    type: COMMON_SIGN_OUT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SIGN_OUT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        signOutPending: true,
        signOutError: null,
      };

    case COMMON_SIGN_OUT_SUCCESS:
      // The request is success
      return {
        ...state,
        signOutPending: false,
        signOutError: null,
        user: null,
        signInState: false,
      };

    case COMMON_SIGN_OUT_FAILURE:
      // The request is failed
      return {
        ...state,
        signOutPending: false,
        signOutError: action.data.error,
      };

    case COMMON_SIGN_OUT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        signOutError: null,
      };

    default:
      return state;
  }
}
