import {
  TIMELINE_SET_EDITING_EVENT,
} from '../../../../src/features/timeline/redux/constants';

import {
  setEditingEvent,
  reducer,
} from '../../../../src/features/timeline/redux/setEditingEvent';

describe('timeline/redux/setEditingEvent', () => {
  it('returns correct action by setEditingEvent', () => {
    expect(setEditingEvent()).toHaveProperty('type', TIMELINE_SET_EDITING_EVENT);
  });

  it('handles action type TIMELINE_SET_EDITING_EVENT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TIMELINE_SET_EDITING_EVENT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
