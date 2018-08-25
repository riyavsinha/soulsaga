import {
  COMMON_POPULATE_SIGN_IN_STATE,
} from '../../../../src/features/common/redux/constants';

import {
  populateSignInState,
  reducer,
} from '../../../../src/features/common/redux/populateSignInState';

describe('common/redux/populateSignInState', () => {
  it('returns correct action by populateSignInState', () => {
    expect(populateSignInState()).toHaveProperty('type', COMMON_POPULATE_SIGN_IN_STATE);
  });

  it('handles action type COMMON_POPULATE_SIGN_IN_STATE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_POPULATE_SIGN_IN_STATE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
