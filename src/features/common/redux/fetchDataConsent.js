import {
  COMMON_FETCH_DATA_CONSENT_BEGIN,
  COMMON_FETCH_DATA_CONSENT_SUCCESS,
  COMMON_FETCH_DATA_CONSENT_FAILURE,
  COMMON_FETCH_DATA_CONSENT_DISMISS_ERROR,
} from './constants';
import {
  database,
  DATA_CONSENT,
  PRIVACY_CONSENT,
  TIMELINE_CONSENT,
} from 'common/firebase';

export function fetchDataConsent() {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_FETCH_DATA_CONSENT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const db = database.ref(DATA_CONSENT).child(getState().common.user.uid)
      const privacyConsentPromise = 
          db.child(PRIVACY_CONSENT).child('currentState').once("value");
      const timelineConsentPromise =
          db.child(TIMELINE_CONSENT).child('currentState').once("value");
      Promise.all([privacyConsentPromise, timelineConsentPromise]).then(
        (res) => {
          dispatch({
            type: COMMON_FETCH_DATA_CONSENT_SUCCESS,
            privacyConsent: res[0].val(),
            timelineConsent: res[1].val(),
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: COMMON_FETCH_DATA_CONSENT_FAILURE,
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
export function dismissFetchDataConsentError() {
  return {
    type: COMMON_FETCH_DATA_CONSENT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_FETCH_DATA_CONSENT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDataConsentPending: true,
        fetchDataConsentError: null,
      };

    case COMMON_FETCH_DATA_CONSENT_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchDataConsentPending: false,
        fetchDataConsentError: null,
        privacyTermsConsent: action.privacyConsent,
        timelineConsent: action.timelineConsent,
      };

    case COMMON_FETCH_DATA_CONSENT_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDataConsentPending: false,
        fetchDataConsentError: action.data.error,
      };

    case COMMON_FETCH_DATA_CONSENT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDataConsentError: null,
      };

    default:
      return state;
  }
}
