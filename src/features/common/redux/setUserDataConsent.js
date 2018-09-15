import {
  COMMON_SET_USER_DATA_CONSENT_BEGIN,
  COMMON_SET_USER_DATA_CONSENT_SUCCESS,
  COMMON_SET_USER_DATA_CONSENT_FAILURE,
  COMMON_SET_USER_DATA_CONSENT_DISMISS_ERROR,
} from './constants';
import {database, DATA_CONSENT} from 'common/firebase';

export function setUserDataConsent(user, consentType, state, texts) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_SET_USER_DATA_CONSENT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const dataLoad = {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        consent: state,
        shownTexts: texts,
        timestamp: Date.now(),
      }
      const db = database.ref(DATA_CONSENT + user.uid).child(consentType);
      Promise.all([db.push(dataLoad), db.child('currentState').set(state)])
        .then(
          (res) => {
            dispatch({
              type: COMMON_SET_USER_DATA_CONSENT_SUCCESS,
              consentType: consentType,
              state: state,
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
      if (action.consentType === "privacyTerms") {
        return {
          ...state,
          setUserDataConsentPending: false,
          setUserDataConsentError: null,
          privacyTermsConsent: action.state,
        };
      } else if (action.consentType === "timeline") {
        return {
          ...state,
          setUserDataConsentPending: false,
          setUserDataConsentError: null,
          timelineConsent: action.state,
        };
      }
      break;

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
