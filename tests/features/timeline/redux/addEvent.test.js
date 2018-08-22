import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  TIMELINE_ADD_EVENT_BEGIN,
  TIMELINE_ADD_EVENT_SUCCESS,
  TIMELINE_ADD_EVENT_FAILURE,
  TIMELINE_ADD_EVENT_DISMISS_ERROR,
} from '../../../../src/features/timeline/redux/constants';

import {
  addEvent,
  dismissAddEventError,
  reducer,
} from '../../../../src/features/timeline/redux/addEvent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('timeline/redux/addEvent', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when addEvent succeeds', () => {
    const store = mockStore({});

    return store.dispatch(addEvent())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TIMELINE_ADD_EVENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', TIMELINE_ADD_EVENT_SUCCESS);
      });
  });

  it('dispatches failure action when addEvent fails', () => {
    const store = mockStore({});

    return store.dispatch(addEvent({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', TIMELINE_ADD_EVENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', TIMELINE_ADD_EVENT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAddEventError', () => {
    const expectedAction = {
      type: TIMELINE_ADD_EVENT_DISMISS_ERROR,
    };
    expect(dismissAddEventError()).toEqual(expectedAction);
  });

  it('handles action type TIMELINE_ADD_EVENT_BEGIN correctly', () => {
    const prevState = { addEventPending: false };
    const state = reducer(
      prevState,
      { type: TIMELINE_ADD_EVENT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addEventPending).toBe(true);
  });

  it('handles action type TIMELINE_ADD_EVENT_SUCCESS correctly', () => {
    const prevState = { addEventPending: true };
    const state = reducer(
      prevState,
      { type: TIMELINE_ADD_EVENT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addEventPending).toBe(false);
  });

  it('handles action type TIMELINE_ADD_EVENT_FAILURE correctly', () => {
    const prevState = { addEventPending: true };
    const state = reducer(
      prevState,
      { type: TIMELINE_ADD_EVENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addEventPending).toBe(false);
    expect(state.addEventError).toEqual(expect.anything());
  });

  it('handles action type TIMELINE_ADD_EVENT_DISMISS_ERROR correctly', () => {
    const prevState = { addEventError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: TIMELINE_ADD_EVENT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.addEventError).toBe(null);
  });
});

