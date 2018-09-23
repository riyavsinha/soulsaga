import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  TIMELINE_FETCH_EVENTS_BEGIN,
  TIMELINE_FETCH_EVENTS_SUCCESS,
  TIMELINE_FETCH_EVENTS_FAILURE,
  TIMELINE_FETCH_EVENTS_DISMISS_ERROR,
} from '../../../../src/features/timeline/redux/constants';

import {
  fetchEvents,
  dismissFetchEventsError,
  reducer,
} from '../../../../src/features/timeline/redux/fetchEvents';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('timeline/redux/fetchEvents', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchEvents succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchEvents())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TIMELINE_FETCH_EVENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', TIMELINE_FETCH_EVENTS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchEvents fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchEvents({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TIMELINE_FETCH_EVENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', TIMELINE_FETCH_EVENTS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchEventsError', () => {
    const expectedAction = {
      type: TIMELINE_FETCH_EVENTS_DISMISS_ERROR,
    };
    expect(dismissFetchEventsError()).toEqual(expectedAction);
  });

  it('handles action type TIMELINE_FETCH_EVENTS_BEGIN correctly', () => {
    const prevState = { fetchEventsPending: false };
    const state = reducer(
      prevState,
      { type: TIMELINE_FETCH_EVENTS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchEventsPending).toBe(true);
  });

  it('handles action type TIMELINE_FETCH_EVENTS_SUCCESS correctly', () => {
    const prevState = { fetchEventsPending: true };
    const state = reducer(
      prevState,
      { type: TIMELINE_FETCH_EVENTS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchEventsPending).toBe(false);
  });

  it('handles action type TIMELINE_FETCH_EVENTS_FAILURE correctly', () => {
    const prevState = { fetchEventsPending: true };
    const state = reducer(
      prevState,
      { type: TIMELINE_FETCH_EVENTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchEventsPending).toBe(false);
    expect(state.fetchEventsError).toEqual(expect.anything());
  });

  it('handles action type TIMELINE_FETCH_EVENTS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchEventsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: TIMELINE_FETCH_EVENTS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchEventsError).toBe(null);
  });
});

