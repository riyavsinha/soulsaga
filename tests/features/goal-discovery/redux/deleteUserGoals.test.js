import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  GOAL_DISCOVERY_DELETE_USER_GOALS_BEGIN,
  GOAL_DISCOVERY_DELETE_USER_GOALS_SUCCESS,
  GOAL_DISCOVERY_DELETE_USER_GOALS_FAILURE,
  GOAL_DISCOVERY_DELETE_USER_GOALS_DISMISS_ERROR,
} from '../../../../src/features/goal-discovery/redux/constants';

import {
  deleteUserGoals,
  dismissDeleteUserGoalsError,
  reducer,
} from '../../../../src/features/goal-discovery/redux/deleteUserGoals';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('goal-discovery/redux/deleteUserGoals', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteUserGoals succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteUserGoals())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GOAL_DISCOVERY_DELETE_USER_GOALS_BEGIN);
        expect(actions[1]).toHaveProperty('type', GOAL_DISCOVERY_DELETE_USER_GOALS_SUCCESS);
      });
  });

  it('dispatches failure action when deleteUserGoals fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteUserGoals({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GOAL_DISCOVERY_DELETE_USER_GOALS_BEGIN);
        expect(actions[1]).toHaveProperty('type', GOAL_DISCOVERY_DELETE_USER_GOALS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteUserGoalsError', () => {
    const expectedAction = {
      type: GOAL_DISCOVERY_DELETE_USER_GOALS_DISMISS_ERROR,
    };
    expect(dismissDeleteUserGoalsError()).toEqual(expectedAction);
  });

  it('handles action type GOAL_DISCOVERY_DELETE_USER_GOALS_BEGIN correctly', () => {
    const prevState = { deleteUserGoalsPending: false };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_DELETE_USER_GOALS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserGoalsPending).toBe(true);
  });

  it('handles action type GOAL_DISCOVERY_DELETE_USER_GOALS_SUCCESS correctly', () => {
    const prevState = { deleteUserGoalsPending: true };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_DELETE_USER_GOALS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserGoalsPending).toBe(false);
  });

  it('handles action type GOAL_DISCOVERY_DELETE_USER_GOALS_FAILURE correctly', () => {
    const prevState = { deleteUserGoalsPending: true };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_DELETE_USER_GOALS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserGoalsPending).toBe(false);
    expect(state.deleteUserGoalsError).toEqual(expect.anything());
  });

  it('handles action type GOAL_DISCOVERY_DELETE_USER_GOALS_DISMISS_ERROR correctly', () => {
    const prevState = { deleteUserGoalsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_DELETE_USER_GOALS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserGoalsError).toBe(null);
  });
});

