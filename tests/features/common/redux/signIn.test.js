import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_SIGN_IN_BEGIN,
  COMMON_SIGN_IN_SUCCESS,
  COMMON_SIGN_IN_FAILURE,
  COMMON_SIGN_IN_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  signIn,
  dismissSignInError,
  reducer,
} from '../../../../src/features/common/redux/signIn';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/signIn', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when signIn succeeds', () => {
    const store = mockStore({});

    return store.dispatch(signIn())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_SIGN_IN_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_SIGN_IN_SUCCESS);
      });
  });

  it('dispatches failure action when signIn fails', () => {
    const store = mockStore({});

    return store.dispatch(signIn({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_SIGN_IN_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_SIGN_IN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSignInError', () => {
    const expectedAction = {
      type: COMMON_SIGN_IN_DISMISS_ERROR,
    };
    expect(dismissSignInError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_SIGN_IN_BEGIN correctly', () => {
    const prevState = { signInPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_SIGN_IN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signInPending).toBe(true);
  });

  it('handles action type COMMON_SIGN_IN_SUCCESS correctly', () => {
    const prevState = { signInPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_SIGN_IN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signInPending).toBe(false);
  });

  it('handles action type COMMON_SIGN_IN_FAILURE correctly', () => {
    const prevState = { signInPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_SIGN_IN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signInPending).toBe(false);
    expect(state.signInError).toEqual(expect.anything());
  });

  it('handles action type COMMON_SIGN_IN_DISMISS_ERROR correctly', () => {
    const prevState = { signInError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_SIGN_IN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signInError).toBe(null);
  });
});

