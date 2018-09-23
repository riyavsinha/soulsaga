import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_FETCH_OR_CREATE_KEY_BEGIN,
  COMMON_FETCH_OR_CREATE_KEY_SUCCESS,
  COMMON_FETCH_OR_CREATE_KEY_FAILURE,
  COMMON_FETCH_OR_CREATE_KEY_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  fetchOrCreateKey,
  dismissFetchOrCreateKeyError,
  reducer,
} from '../../../../src/features/common/redux/fetchOrCreateKey';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/fetchOrCreateKey', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchOrCreateKey succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchOrCreateKey())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_FETCH_OR_CREATE_KEY_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_FETCH_OR_CREATE_KEY_SUCCESS);
      });
  });

  it('dispatches failure action when fetchOrCreateKey fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchOrCreateKey({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_FETCH_OR_CREATE_KEY_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_FETCH_OR_CREATE_KEY_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchOrCreateKeyError', () => {
    const expectedAction = {
      type: COMMON_FETCH_OR_CREATE_KEY_DISMISS_ERROR,
    };
    expect(dismissFetchOrCreateKeyError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_FETCH_OR_CREATE_KEY_BEGIN correctly', () => {
    const prevState = { fetchOrCreateKeyPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_FETCH_OR_CREATE_KEY_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchOrCreateKeyPending).toBe(true);
  });

  it('handles action type COMMON_FETCH_OR_CREATE_KEY_SUCCESS correctly', () => {
    const prevState = { fetchOrCreateKeyPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_FETCH_OR_CREATE_KEY_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchOrCreateKeyPending).toBe(false);
  });

  it('handles action type COMMON_FETCH_OR_CREATE_KEY_FAILURE correctly', () => {
    const prevState = { fetchOrCreateKeyPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_FETCH_OR_CREATE_KEY_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchOrCreateKeyPending).toBe(false);
    expect(state.fetchOrCreateKeyError).toEqual(expect.anything());
  });

  it('handles action type COMMON_FETCH_OR_CREATE_KEY_DISMISS_ERROR correctly', () => {
    const prevState = { fetchOrCreateKeyError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_FETCH_OR_CREATE_KEY_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchOrCreateKeyError).toBe(null);
  });
});

