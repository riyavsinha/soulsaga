// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMMON_POPULATE_SIGN_IN_STATE,
} from './constants';

export function populateSignInState(isSignedIn) {
  return {
    type: COMMON_POPULATE_SIGN_IN_STATE,
    signInState: isSignedIn,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_POPULATE_SIGN_IN_STATE:
      return {
        ...state,
        signInState: action.signInState,
      };

    default:
      return state;
  }
}
