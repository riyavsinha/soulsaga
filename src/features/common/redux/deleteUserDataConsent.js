import {
  COMMON_DELETE_USER_DATA_CONSENT_BEGIN,
  COMMON_DELETE_USER_DATA_CONSENT_SUCCESS,
  COMMON_DELETE_USER_DATA_CONSENT_FAILURE,
  COMMON_DELETE_USER_DATA_CONSENT_DISMISS_ERROR,
} from './constants';
import {
  database,
  DATA_CONSENT,
} from 'common/firebase';

export function deleteUserDataConsent() {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_DELETE_USER_DATA_CONSENT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = database.ref(DATA_CONSENT)
          .child(getState().common.user.uid).remove();
      doRequest.then(
        (res) => {
          dispatch({
            type: COMMON_DELETE_USER_DATA_CONSENT_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: COMMON_DELETE_USER_DATA_CONSENT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDeleteUserDataConsentError() {
  return {
    type: COMMON_DELETE_USER_DATA_CONSENT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_DELETE_USER_DATA_CONSENT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deleteUserDataConsentPending: true,
        deleteUserDataConsentError: null,
      };

    case COMMON_DELETE_USER_DATA_CONSENT_SUCCESS:
      // The request is success
      return {
        ...state,
        deleteUserDataConsentPending: false,
        deleteUserDataConsentError: null,
        privacyTermsConsent: null,
        timelineConsent: null,
      };

    case COMMON_DELETE_USER_DATA_CONSENT_FAILURE:
      // The request is failed
      return {
        ...state,
        deleteUserDataConsentPending: false,
        deleteUserDataConsentError: action.data.error,
      };

    case COMMON_DELETE_USER_DATA_CONSENT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deleteUserDataConsentError: null,
      };

    default:
      return state;
  }
}
