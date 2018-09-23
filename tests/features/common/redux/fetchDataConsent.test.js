import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_FETCH_DATA_CONSENT_BEGIN,
  COMMON_FETCH_DATA_CONSENT_SUCCESS,
  COMMON_FETCH_DATA_CONSENT_FAILURE,
  COMMON_FETCH_DATA_CONSENT_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  fetchDataConsent,
  dismissFetchDataConsentError,
  reducer,
} from '../../../../src/features/common/redux/fetchDataConsent';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/fetchDataConsent', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchDataConsent succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchDataConsent())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_FETCH_DATA_CONSENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_FETCH_DATA_CONSENT_SUCCESS);
      });
  });

  it('dispatches failure action when fetchDataConsent fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchDataConsent({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_FETCH_DATA_CONSENT_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_FETCH_DATA_CONSENT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchDataConsentError', () => {
    const expectedAction = {
      type: COMMON_FETCH_DATA_CONSENT_DISMISS_ERROR,
    };
    expect(dismissFetchDataConsentError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_FETCH_DATA_CONSENT_BEGIN correctly', () => {
    const prevState = { fetchDataConsentPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_FETCH_DATA_CONSENT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchDataConsentPending).toBe(true);
  });

  it('handles action type COMMON_FETCH_DATA_CONSENT_SUCCESS correctly', () => {
    const prevState = { fetchDataConsentPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_FETCH_DATA_CONSENT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchDataConsentPending).toBe(false);
  });

  it('handles action type COMMON_FETCH_DATA_CONSENT_FAILURE correctly', () => {
    const prevState = { fetchDataConsentPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_FETCH_DATA_CONSENT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchDataConsentPending).toBe(false);
    expect(state.fetchDataConsentError).toEqual(expect.anything());
  });

  it('handles action type COMMON_FETCH_DATA_CONSENT_DISMISS_ERROR correctly', () => {
    const prevState = { fetchDataConsentError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_FETCH_DATA_CONSENT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchDataConsentError).toBe(null);
  });
});

