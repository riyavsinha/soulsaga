import {
  TIMELINE_SET_CHRONO_ORDER,
} from '../../../../src/features/timeline/redux/constants';

import {
  setChronoOrder,
  reducer,
} from '../../../../src/features/timeline/redux/setChronoOrder';

describe('timeline/redux/setChronoOrder', () => {
  it('returns correct action by setChronoOrder', () => {
    expect(setChronoOrder()).toHaveProperty('type', TIMELINE_SET_CHRONO_ORDER);
  });

  it('handles action type TIMELINE_SET_CHRONO_ORDER correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TIMELINE_SET_CHRONO_ORDER }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
