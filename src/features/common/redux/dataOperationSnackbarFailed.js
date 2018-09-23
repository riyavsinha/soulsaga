// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMMON_DATA_OPERATION_SNACKBAR_FAILED,
} from './constants';

export function dataOperationSnackbarFailed(dataFailureState = true) {
  return {
    type: COMMON_DATA_OPERATION_SNACKBAR_FAILED,
    state: dataFailureState,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_DATA_OPERATION_SNACKBAR_FAILED:
      return {
        ...state,
        dataSaveFailureSnackbarOpen: action.state,
      };

    default:
      return state;
  }
}
