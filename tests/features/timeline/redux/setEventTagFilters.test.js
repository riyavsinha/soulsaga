import {
  TIMELINE_SET_EVENT_TAG_FILTERS,
} from '../../../../src/features/timeline/redux/constants';

import {
  setEventTagFilters,
  reducer,
} from '../../../../src/features/timeline/redux/setEventTagFilters';

describe('timeline/redux/setEventTagFilters', () => {
  it('returns correct action by setEventTagFilters', () => {
    expect(setEventTagFilters()).toHaveProperty('type', TIMELINE_SET_EVENT_TAG_FILTERS);
  });

  it('handles action type TIMELINE_SET_EVENT_TAG_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TIMELINE_SET_EVENT_TAG_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
