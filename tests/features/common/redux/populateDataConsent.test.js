import {
  COMMON_POPULATE_DATA_CONSENT,
} from '../../../../src/features/common/redux/constants';

import {
  populateDataConsent,
  reducer,
} from '../../../../src/features/common/redux/populateDataConsent';

describe('common/redux/populateDataConsent', () => {
  it('returns correct action by populateDataConsent', () => {
    expect(populateDataConsent()).toHaveProperty('type', COMMON_POPULATE_DATA_CONSENT);
  });

  it('handles action type COMMON_POPULATE_DATA_CONSENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_POPULATE_DATA_CONSENT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
