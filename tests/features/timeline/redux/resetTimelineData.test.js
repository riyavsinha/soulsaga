import {
  TIMELINE_RESET_TIMELINE_DATA,
} from '../../../../src/features/timeline/redux/constants';

import {
  resetTimelineData,
  reducer,
} from '../../../../src/features/timeline/redux/resetTimelineData';

describe('timeline/redux/resetTimelineData', () => {
  it('returns correct action by resetTimelineData', () => {
    expect(resetTimelineData()).toHaveProperty('type', TIMELINE_RESET_TIMELINE_DATA);
  });

  it('handles action type TIMELINE_RESET_TIMELINE_DATA correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TIMELINE_RESET_TIMELINE_DATA }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
