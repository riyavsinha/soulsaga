import {
  TIMELINE_POPULATE_EVENTS,
} from '../../../../src/features/timeline/redux/constants';

import {
  populateEvents,
  reducer,
} from '../../../../src/features/timeline/redux/populateEvents';

describe('timeline/redux/populateEvents', () => {
  it('returns correct action by populateEvents', () => {
    expect(populateEvents()).toHaveProperty('type', TIMELINE_POPULATE_EVENTS);
  });

  it('handles action type TIMELINE_POPULATE_EVENTS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TIMELINE_POPULATE_EVENTS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
