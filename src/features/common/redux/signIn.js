import {
  COMMON_SIGN_IN_BEGIN,
  COMMON_SIGN_IN_SUCCESS,
  COMMON_SIGN_IN_FAILURE,
  COMMON_SIGN_IN_DISMISS_ERROR,
} from './constants';
import {auth, provider} from 'common/firebase';

export function signIn() {
  return (dispatch) => {
    dispatch({
      type: COMMON_SIGN_IN_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      auth.signInWithPopup(provider)
        .then(
          (res) => {
            dispatch({
              type: COMMON_SIGN_IN_SUCCESS,
              user: res.user
            });
            resolve(res);
          },
          // Use rejectHandler as the second argument so that render errors won't be caught.
          (err) => {
            dispatch({
              type: COMMON_SIGN_IN_FAILURE,
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
export function dismissSignInError() {
  return {
    type: COMMON_SIGN_IN_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SIGN_IN_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        signInPending: true,
        signInError: null,
      };

    case COMMON_SIGN_IN_SUCCESS:
      // The request is success
      return {
        ...state,
        signInPending: false,
        signInError: null,
        user: {
          name: action.name,
          photoUrl: action.photoUrl,
          id: action.id,
        }
      };

    case COMMON_SIGN_IN_FAILURE:
      // The request is failed
      return {
        ...state,
        signInPending: false,
        signInError: action.data.error,
      };

    case COMMON_SIGN_IN_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        signInError: null,
      };

    default:
      return state;
  }
}
