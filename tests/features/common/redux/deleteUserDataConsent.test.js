import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_DELETE_USER_DATA_CONSENT_BEGIN,
  COMMON_DELETE_USER_DATA_CONSENT_SUCCESS,
  COMMON_DELETE_USER_DATA_CONSENT_FAILURE,
  COMMON_DELETE_USER_DATA_CONSENT_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  deleteUserDataConsent,
  dismissDeleteUserDataConsentError,
  reducer,
} from '../../../../src/features/common/redux/deleteUserDataConsent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/deleteUserDataConsent', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteUserDataConsent succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteUserDataConsent())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_DELETE_USER_DATA_CONSENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_DELETE_USER_DATA_CONSENT_SUCCESS);
      });
  });

  it('dispatches failure action when deleteUserDataConsent fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteUserDataConsent({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_DELETE_USER_DATA_CONSENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_DELETE_USER_DATA_CONSENT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteUserDataConsentError', () => {
    const expectedAction = {
      type: COMMON_DELETE_USER_DATA_CONSENT_DISMISS_ERROR,
    };
    expect(dismissDeleteUserDataConsentError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_DELETE_USER_DATA_CONSENT_BEGIN correctly', () => {
    const prevState = { deleteUserDataConsentPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_DELETE_USER_DATA_CONSENT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserDataConsentPending).toBe(true);
  });

  it('handles action type COMMON_DELETE_USER_DATA_CONSENT_SUCCESS correctly', () => {
    const prevState = { deleteUserDataConsentPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_DELETE_USER_DATA_CONSENT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserDataConsentPending).toBe(false);
  });

  it('handles action type COMMON_DELETE_USER_DATA_CONSENT_FAILURE correctly', () => {
    const prevState = { deleteUserDataConsentPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_DELETE_USER_DATA_CONSENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserDataConsentPending).toBe(false);
    expect(state.deleteUserDataConsentError).toEqual(expect.anything());
  });

  it('handles action type COMMON_DELETE_USER_DATA_CONSENT_DISMISS_ERROR correctly', () => {
    const prevState = { deleteUserDataConsentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_DELETE_USER_DATA_CONSENT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteUserDataConsentError).toBe(null);
  });
});

