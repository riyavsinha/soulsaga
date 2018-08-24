import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_SET_USER_DATA_CONSENT_BEGIN,
  COMMON_SET_USER_DATA_CONSENT_SUCCESS,
  COMMON_SET_USER_DATA_CONSENT_FAILURE,
  COMMON_SET_USER_DATA_CONSENT_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  setUserDataConsent,
  dismissSetUserDataConsentError,
  reducer,
} from '../../../../src/features/common/redux/setUserDataConsent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/setUserDataConsent', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when setUserDataConsent succeeds', () => {
    const store = mockStore({});

    return store.dispatch(setUserDataConsent())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_SET_USER_DATA_CONSENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_SET_USER_DATA_CONSENT_SUCCESS);
      });
  });

  it('dispatches failure action when setUserDataConsent fails', () => {
    const store = mockStore({});

    return store.dispatch(setUserDataConsent({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_SET_USER_DATA_CONSENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_SET_USER_DATA_CONSENT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSetUserDataConsentError', () => {
    const expectedAction = {
      type: COMMON_SET_USER_DATA_CONSENT_DISMISS_ERROR,
    };
    expect(dismissSetUserDataConsentError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_SET_USER_DATA_CONSENT_BEGIN correctly', () => {
    const prevState = { changeUserDataConsentPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_SET_USER_DATA_CONSENT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changeUserDataConsentPending).toBe(true);
  });

  it('handles action type COMMON_SET_USER_DATA_CONSENT_SUCCESS correctly', () => {
    const prevState = { changeUserDataConsentPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_SET_USER_DATA_CONSENT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changeUserDataConsentPending).toBe(false);
  });

  it('handles action type COMMON_SET_USER_DATA_CONSENT_FAILURE correctly', () => {
    const prevState = { changeUserDataConsentPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_SET_USER_DATA_CONSENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changeUserDataConsentPending).toBe(false);
    expect(state.changeUserDataConsentError).toEqual(expect.anything());
  });

  it('handles action type COMMON_SET_USER_DATA_CONSENT_DISMISS_ERROR correctly', () => {
    const prevState = { changeUserDataConsentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_SET_USER_DATA_CONSENT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changeUserDataConsentError).toBe(null);
  });
});

