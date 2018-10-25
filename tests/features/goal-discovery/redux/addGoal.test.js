import {
  GOAL_DISCOVERY_ADD_GOAL,
} from '../../../../src/features/goal-discovery/redux/constants';

import {
  addGoal,
  reducer,
} from '../../../../src/features/goal-discovery/redux/addGoal';

describe('goal-discovery/redux/addGoal', () => {
  it('returns correct action by addGoal', () => {
    expect(addGoal()).toHaveProperty('type', GOAL_DISCOVERY_ADD_GOAL);
  });

  it('handles action type GOAL_DISCOVERY_ADD_GOAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_ADD_GOAL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
