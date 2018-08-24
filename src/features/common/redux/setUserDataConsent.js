import {
  COMMON_SET_USER_DATA_CONSENT_BEGIN,
  COMMON_SET_USER_DATA_CONSENT_SUCCESS,
  COMMON_SET_USER_DATA_CONSENT_FAILURE,
  COMMON_SET_USER_DATA_CONSENT_DISMISS_ERROR,
} from './constants';
import {database, DATA_CONSENT} from 'common/firebase';

export function setUserDataConsent(name, uid, storeData, texts) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_SET_USER_DATA_CONSENT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const dataLoad = {
        name: name,
        uid: uid,
        consent: storeData,
        shownTexts: texts,
        timestamp: Date.now(),
      }
      console.log(dataLoad);
      const db = database.ref(DATA_CONSENT + uid)
      Promise.all([db.push(dataLoad), db.child('currentState').set(storeData)])
        .then(
          (res) => {
            dispatch({
              type: COMMON_SET_USER_DATA_CONSENT_SUCCESS,
              storeUserData: storeData,
            });
            resolve(res);
          },
          // Use rejectHandler as the second argument so that render errors won't be caught.
          (err) => {
            dispatch({
              type: COMMON_SET_USER_DATA_CONSENT_FAILURE,
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
export function dismissSetUserDataConsentError() {
  return {
    type: COMMON_SET_USER_DATA_CONSENT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_USER_DATA_CONSENT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        setUserDataConsentPending: true,
        setUserDataConsentError: null,
      };

    case COMMON_SET_USER_DATA_CONSENT_SUCCESS:
      // The request is success
      return {
        ...state,
        setUserDataConsentPending: false,
        setUserDataConsentError: null,
        storeUserData: action.storeUserData,
      };

    case COMMON_SET_USER_DATA_CONSENT_FAILURE:
      // The request is failed
      return {
        ...state,
        setUserDataConsentPending: false,
        setUserDataConsentError: action.data.error,
      };

    case COMMON_SET_USER_DATA_CONSENT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        setUserDataConsentError: null,
      };

    default:
      return state;
  }
}
