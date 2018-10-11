import {
  TIMELINE_SET_EVENT_CATEGORY_FILTERS,
} from '../../../../src/features/timeline/redux/constants';

import {
  setEventCategoryFilters,
  reducer,
} from '../../../../src/features/timeline/redux/setEventCategoryFilters';

describe('timeline/redux/setEventCategoryFilters', () => {
  it('returns correct action by setEventCategoryFilters', () => {
    expect(setEventCategoryFilters()).toHaveProperty('type', TIMELINE_SET_EVENT_CATEGORY_FILTERS);
  });

  it('handles action type TIMELINE_SET_EVENT_CATEGORY_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TIMELINE_SET_EVENT_CATEGORY_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
