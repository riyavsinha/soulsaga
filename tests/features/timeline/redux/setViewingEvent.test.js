import {
  TIMELINE_SET_VIEWING_EVENT,
} from '../../../../src/features/timeline/redux/constants';

import {
  setViewingEvent,
  reducer,
} from '../../../../src/features/timeline/redux/setViewingEvent';

describe('timeline/redux/setViewingEvent', () => {
  it('returns correct action by setViewingEvent', () => {
    expect(setViewingEvent()).toHaveProperty('type', TIMELINE_SET_VIEWING_EVENT);
  });

  it('handles action type TIMELINE_SET_VIEWING_EVENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TIMELINE_SET_VIEWING_EVENT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
