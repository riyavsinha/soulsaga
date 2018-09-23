// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as signInReducer } from './signIn';
import { reducer as populateUserReducer } from './populateUser';
import { reducer as signOutReducer } from './signOut';
import { reducer as setUserDataConsentReducer } from './setUserDataConsent';
import { reducer as populateSignInStateReducer } from './populateSignInState';
import { reducer as deleteUserReducer } from './deleteUser';
import { reducer as fetchDataConsentReducer } from './fetchDataConsent';
import { reducer as fetchOrCreateKeyReducer } from './fetchOrCreateKey';
import { reducer as dataOperationSnackbarSucceededReducer } from './dataOperationSnackbarSucceeded';
import { reducer as dataOperationSnackbarFailedReducer } from './dataOperationSnackbarFailed';

const reducers = [
  signInReducer,
  populateUserReducer,
  signOutReducer,
  setUserDataConsentReducer,
  populateSignInStateReducer,
  deleteUserReducer,
  fetchDataConsentReducer,
  fetchOrCreateKeyReducer,
  dataOperationSnackbarSucceededReducer,
  dataOperationSnackbarFailedReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
