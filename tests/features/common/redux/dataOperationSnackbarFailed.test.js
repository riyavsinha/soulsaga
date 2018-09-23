import {
  COMMON_DATA_OPERATION_SNACKBAR_FAILED,
} from '../../../../src/features/common/redux/constants';

import {
  dataOperationSnackbarFailed,
  reducer,
} from '../../../../src/features/common/redux/dataOperationSnackbarFailed';

describe('common/redux/dataOperationSnackbarFailed', () => {
  it('returns correct action by dataOperationSnackbarFailed', () => {
    expect(dataOperationSnackbarFailed()).toHaveProperty('type', COMMON_DATA_OPERATION_SNACKBAR_FAILED);
  });

  it('handles action type COMMON_DATA_OPERATION_SNACKBAR_FAILED correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_DATA_OPERATION_SNACKBAR_FAILED }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
