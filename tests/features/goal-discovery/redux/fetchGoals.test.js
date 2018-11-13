import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  GOAL_DISCOVERY_FETCH_GOALS_BEGIN,
  GOAL_DISCOVERY_FETCH_GOALS_SUCCESS,
  GOAL_DISCOVERY_FETCH_GOALS_FAILURE,
  GOAL_DISCOVERY_FETCH_GOALS_DISMISS_ERROR,
} from '../../../../src/features/goal-discovery/redux/constants';

import {
  fetchGoals,
  dismissFetchGoalsError,
  reducer,
} from '../../../../src/features/goal-discovery/redux/fetchGoals';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('goal-discovery/redux/fetchGoals', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchGoals succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchGoals())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GOAL_DISCOVERY_FETCH_GOALS_BEGIN);
        expect(actions[1]).toHaveProperty('type', GOAL_DISCOVERY_FETCH_GOALS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchGoals fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchGoals({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', GOAL_DISCOVERY_FETCH_GOALS_BEGIN);
        expect(actions[1]).toHaveProperty('type', GOAL_DISCOVERY_FETCH_GOALS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchGoalsError', () => {
    const expectedAction = {
      type: GOAL_DISCOVERY_FETCH_GOALS_DISMISS_ERROR,
    };
    expect(dismissFetchGoalsError()).toEqual(expectedAction);
  });

  it('handles action type GOAL_DISCOVERY_FETCH_GOALS_BEGIN correctly', () => {
    const prevState = { fetchGoalsPending: false };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_FETCH_GOALS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGoalsPending).toBe(true);
  });

  it('handles action type GOAL_DISCOVERY_FETCH_GOALS_SUCCESS correctly', () => {
    const prevState = { fetchGoalsPending: true };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_FETCH_GOALS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGoalsPending).toBe(false);
  });

  it('handles action type GOAL_DISCOVERY_FETCH_GOALS_FAILURE correctly', () => {
    const prevState = { fetchGoalsPending: true };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_FETCH_GOALS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGoalsPending).toBe(false);
    expect(state.fetchGoalsError).toEqual(expect.anything());
  });

  it('handles action type GOAL_DISCOVERY_FETCH_GOALS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchGoalsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: GOAL_DISCOVERY_FETCH_GOALS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchGoalsError).toBe(null);
  });
});

