import {
  COMMON_DATA_OPERATION_SNACKBAR_SUCCEEDED,
} from '../../../../src/features/common/redux/constants';

import {
  dataOperationSnackbarSucceeded,
  reducer,
} from '../../../../src/features/common/redux/dataOperationSnackbarSucceeded';

describe('common/redux/dataOperationSnackbarSucceeded', () => {
  it('returns correct action by dataOperationSnackbarSucceeded', () => {
    expect(dataOperationSnackbarSucceeded()).toHaveProperty('type', COMMON_DATA_OPERATION_SNACKBAR_SUCCEEDED);
  });

  it('handles action type COMMON_DATA_OPERATION_SNACKBAR_SUCCEEDED correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_DATA_OPERATION_SNACKBAR_SUCCEEDED }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
