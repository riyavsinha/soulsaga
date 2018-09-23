import {
  TIMELINE_SET_HAS_LOADED_EVENTS,
} from '../../../../src/features/timeline/redux/constants';

import {
  setHasLoadedEvents,
  reducer,
} from '../../../../src/features/timeline/redux/setHasLoadedEvents';

describe('timeline/redux/setHasLoadedEvents', () => {
  it('returns correct action by setHasLoadedEvents', () => {
    expect(setHasLoadedEvents()).toHaveProperty('type', TIMELINE_SET_HAS_LOADED_EVENTS);
  });

  it('handles action type TIMELINE_SET_HAS_LOADED_EVENTS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TIMELINE_SET_HAS_LOADED_EVENTS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
