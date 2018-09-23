import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  TIMELINE_DELETE_USER_EVENTS_BEGIN,
  TIMELINE_DELETE_USER_EVENTS_SUCCESS,
  TIMELINE_DELETE_USER_EVENTS_FAILURE,
  TIMELINE_DELETE_USER_EVENTS_DISMISS_ERROR,
} from '../../../../src/features/timeline/redux/constants';

import {
  deleteUserEvents,
  dismissDeleteUserEventsError,
  reducer,
} from '../../../../src/features/timeline/redux/deleteUserEvents';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('timeline/redux/deleteUserEvents', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteUserEvents succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteUserEvents())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TIMELINE_DELETE_USER_EVENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', TIMELINE_DELETE_USER_EVENTS_SUCCESS);
      });
  });

  it('dispatches failure action when deleteUserEvents fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteUserEvents({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TIMELINE_DELETE_USER_EVENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', TIMELINE_DELETE_USER_EVENTS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteUserEventsError', () => {
    const expectedAction = {
      type: TIMELINE_DELETE_USER_EVENTS_DISMISS_ERROR,
    };
    expect(dismissDeleteUserEventsError()).toEqual(expectedAction);
  });

  it('handles action type TIMELINE_DELETE_USER_EVENTS_BEGIN correctly', () => {
    const prevState = { deleteUserEventsPending: false };
    const state = reducer(
      prevState,
      { type: TIMELINE_DELETE_USER_EVENTS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserEventsPending).toBe(true);
  });

  it('handles action type TIMELINE_DELETE_USER_EVENTS_SUCCESS correctly', () => {
    const prevState = { deleteUserEventsPending: true };
    const state = reducer(
      prevState,
      { type: TIMELINE_DELETE_USER_EVENTS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserEventsPending).toBe(false);
  });

  it('handles action type TIMELINE_DELETE_USER_EVENTS_FAILURE correctly', () => {
    const prevState = { deleteUserEventsPending: true };
    const state = reducer(
      prevState,
      { type: TIMELINE_DELETE_USER_EVENTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserEventsPending).toBe(false);
    expect(state.deleteUserEventsError).toEqual(expect.anything());
  });

  it('handles action type TIMELINE_DELETE_USER_EVENTS_DISMISS_ERROR correctly', () => {
    const prevState = { deleteUserEventsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: TIMELINE_DELETE_USER_EVENTS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserEventsError).toBe(null);
  });
});

