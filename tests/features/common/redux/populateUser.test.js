import {
  COMMON_POPULATE_USER,
} from '../../../../src/features/common/redux/constants';

import {
  populateUser,
  reducer,
} from '../../../../src/features/common/redux/populateUser';

describe('common/redux/populateUser', () => {
  it('returns correct action by populateUser', () => {
    expect(populateUser()).toHaveProperty('type', COMMON_POPULATE_USER);
  });

  it('handles action type COMMON_POPULATE_USER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_POPULATE_USER }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
