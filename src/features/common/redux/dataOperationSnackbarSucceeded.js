// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMMON_DATA_OPERATION_SNACKBAR_SUCCEEDED,
} from './constants';

export function dataOperationSnackbarSucceeded(successSnackbarState = true) {
  return {
    type: COMMON_DATA_OPERATION_SNACKBAR_SUCCEEDED,
    state: successSnackbarState
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_DATA_OPERATION_SNACKBAR_SUCCEEDED:
      return {
        ...state,
        dataSaveSuccessSnackbarOpen: action.state,
      };

    default:
      return state;
  }
}
