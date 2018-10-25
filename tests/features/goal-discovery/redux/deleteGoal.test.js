import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  GOAL_DISCOVERY_DELETE_GOAL_BEGIN,
  GOAL_DISCOVERY_DELETE_GOAL_SUCCESS,
  GOAL_DISCOVERY_DELETE_GOAL_FAILURE,
  GOAL_DISCOVERY_DELETE_GOAL_DISMISS_ERROR,
} from '../../../../src/features/goal-discovery/redux/constants';

import {
  deleteGoal,
  dismissDeleteGoalError,
  reducer,
} from '../../../../src/features/goal-discovery/redux/deleteGoal';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('goal-discovery/redux/deleteGoal', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteGoal succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteGoal())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GOAL_DISCOVERY_DELETE_GOAL_BEGIN);
        expect(actions[1]).toHaveProperty('type', GOAL_DISCOVERY_DELETE_GOAL_SUCCESS);
      });
  });

  it('dispatches failure action when deleteGoal fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteGoal({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GOAL_DISCOVERY_DELETE_GOAL_BEGIN);
        expect(actions[1]).toHaveProperty('type', GOAL_DISCOVERY_DELETE_GOAL_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteGoalError', () => {
    const expectedAction = {
      type: GOAL_DISCOVERY_DELETE_GOAL_DISMISS_ERROR,
    };
    expect(dismissDeleteGoalError()).toEqual(expectedAction);
  });

  it('handles action type GOAL_DISCOVERY_DELETE_GOAL_BEGIN correctly', () => {
    const prevState = { deleteGoalPending: false };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_DELETE_GOAL_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteGoalPending).toBe(true);
  });

  it('handles action type GOAL_DISCOVERY_DELETE_GOAL_SUCCESS correctly', () => {
    const prevState = { deleteGoalPending: true };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_DELETE_GOAL_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteGoalPending).toBe(false);
  });

  it('handles action type GOAL_DISCOVERY_DELETE_GOAL_FAILURE correctly', () => {
    const prevState = { deleteGoalPending: true };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_DELETE_GOAL_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteGoalPending).toBe(false);
    expect(state.deleteGoalError).toEqual(expect.anything());
  });

  it('handles action type GOAL_DISCOVERY_DELETE_GOAL_DISMISS_ERROR correctly', () => {
    const prevState = { deleteGoalError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_DELETE_GOAL_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteGoalError).toBe(null);
  });
});

