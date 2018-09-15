// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMMON_POPULATE_DATA_CONSENT,
} from './constants';

export function populateDataConsent(consentStates) {
  return {
    type: COMMON_POPULATE_DATA_CONSENT,
    privacyConsentState: consentStates[0],
    timelineConsentState: consentStates[1]
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_POPULATE_DATA_CONSENT:
      return {
        ...state,
        privacyTermsConsent: action.privacyConsentState,
        timelineConsent: action.timelineConsentState
      };

    default:
      return state;
  }
}
