import {
  TIMELINE_TOGGLE_ADD_EVENT_FORM,
} from '../../../../src/features/timeline/redux/constants';

import {
  toggleAddEventForm,
  reducer,
} from '../../../../src/features/timeline/redux/toggleAddEventForm';

describe('timeline/redux/toggleAddEventForm', () => {
  it('returns correct action by toggleAddEventForm', () => {
    expect(toggleAddEventForm()).toHaveProperty('type', TIMELINE_TOGGLE_ADD_EVENT_FORM);
  });

  it('handles action type TIMELINE_TOGGLE_ADD_EVENT_FORM correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: TIMELINE_TOGGLE_ADD_EVENT_FORM }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
