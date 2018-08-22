import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  TIMELINE_DELETE_EVENT_BEGIN,
  TIMELINE_DELETE_EVENT_SUCCESS,
  TIMELINE_DELETE_EVENT_FAILURE,
  TIMELINE_DELETE_EVENT_DISMISS_ERROR,
} from '../../../../src/features/timeline/redux/constants';

import {
  deleteEvent,
  dismissDeleteEventError,
  reducer,
} from '../../../../src/features/timeline/redux/deleteEvent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('timeline/redux/deleteEvent', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteEvent succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteEvent())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TIMELINE_DELETE_EVENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', TIMELINE_DELETE_EVENT_SUCCESS);
      });
  });

  it('dispatches failure action when deleteEvent fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteEvent({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TIMELINE_DELETE_EVENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', TIMELINE_DELETE_EVENT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteEventError', () => {
    const expectedAction = {
      type: TIMELINE_DELETE_EVENT_DISMISS_ERROR,
    };
    expect(dismissDeleteEventError()).toEqual(expectedAction);
  });

  it('handles action type TIMELINE_DELETE_EVENT_BEGIN correctly', () => {
    const prevState = { deleteEventPending: false };
    const state = reducer(
      prevState,
      { type: TIMELINE_DELETE_EVENT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteEventPending).toBe(true);
  });

  it('handles action type TIMELINE_DELETE_EVENT_SUCCESS correctly', () => {
    const prevState = { deleteEventPending: true };
    const state = reducer(
      prevState,
      { type: TIMELINE_DELETE_EVENT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteEventPending).toBe(false);
  });

  it('handles action type TIMELINE_DELETE_EVENT_FAILURE correctly', () => {
    const prevState = { deleteEventPending: true };
    const state = reducer(
      prevState,
      { type: TIMELINE_DELETE_EVENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteEventPending).toBe(false);
    expect(state.deleteEventError).toEqual(expect.anything());
  });

  it('handles action type TIMELINE_DELETE_EVENT_DISMISS_ERROR correctly', () => {
    const prevState = { deleteEventError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: TIMELINE_DELETE_EVENT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteEventError).toBe(null);
  });
});

