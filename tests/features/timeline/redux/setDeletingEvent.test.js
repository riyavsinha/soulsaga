import {
  TIMELINE_SET_DELETING_EVENT,
} from '../../../../src/features/timeline/redux/constants';

import {
  setDeletingEvent,
  reducer,
} from '../../../../src/features/timeline/redux/setDeletingEvent';

describe('timeline/redux/setDeletingEvent', () => {
  it('returns correct action by setDeletingEvent', () => {
    expect(setDeletingEvent()).toHaveProperty('type', TIMELINE_SET_DELETING_EVENT);
  });

  it('handles action type TIMELINE_SET_DELETING_EVENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TIMELINE_SET_DELETING_EVENT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
