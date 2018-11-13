import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  GOAL_DISCOVERY_SAVE_GOAL_BEGIN,
  GOAL_DISCOVERY_SAVE_GOAL_SUCCESS,
  GOAL_DISCOVERY_SAVE_GOAL_FAILURE,
  GOAL_DISCOVERY_SAVE_GOAL_DISMISS_ERROR,
} from '../../../../src/features/goal-discovery/redux/constants';

import {
  saveGoal,
  dismissSaveGoalError,
  reducer,
} from '../../../../src/features/goal-discovery/redux/saveGoal';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('goal-discovery/redux/saveGoal', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when saveGoal succeeds', () => {
    const store = mockStore({});

    return store.dispatch(saveGoal())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GOAL_DISCOVERY_SAVE_GOAL_BEGIN);
        expect(actions[1]).toHaveProperty('type', GOAL_DISCOVERY_SAVE_GOAL_SUCCESS);
      });
  });

  it('dispatches failure action when saveGoal fails', () => {
    const store = mockStore({});

    return store.dispatch(saveGoal({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GOAL_DISCOVERY_SAVE_GOAL_BEGIN);
        expect(actions[1]).toHaveProperty('type', GOAL_DISCOVERY_SAVE_GOAL_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSaveGoalError', () => {
    const expectedAction = {
      type: GOAL_DISCOVERY_SAVE_GOAL_DISMISS_ERROR,
    };
    expect(dismissSaveGoalError()).toEqual(expectedAction);
  });

  it('handles action type GOAL_DISCOVERY_SAVE_GOAL_BEGIN correctly', () => {
    const prevState = { saveGoalPending: false };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_SAVE_GOAL_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveGoalPending).toBe(true);
  });

  it('handles action type GOAL_DISCOVERY_SAVE_GOAL_SUCCESS correctly', () => {
    const prevState = { saveGoalPending: true };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_SAVE_GOAL_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveGoalPending).toBe(false);
  });

  it('handles action type GOAL_DISCOVERY_SAVE_GOAL_FAILURE correctly', () => {
    const prevState = { saveGoalPending: true };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_SAVE_GOAL_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveGoalPending).toBe(false);
    expect(state.saveGoalError).toEqual(expect.anything());
  });

  it('handles action type GOAL_DISCOVERY_SAVE_GOAL_DISMISS_ERROR correctly', () => {
    const prevState = { saveGoalError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_SAVE_GOAL_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.saveGoalError).toBe(null);
  });
});

