import {
  TIMELINE_ADD_EVENT_BEGIN,
  TIMELINE_ADD_EVENT_SUCCESS,
  TIMELINE_ADD_EVENT_FAILURE,
  TIMELINE_ADD_EVENT_DISMISS_ERROR,
} from './constants';
import {
  database,
  TIMELINE,
  CRAL
} from 'common/firebase';
import { str2ab, ab2str } from 'common/util/strbuffer';
import binfind from 'common/util/binfind';

/**
 * Action to save a new event.
 * 
 * @param e {!EventProto} The event object
 */
export function addEvent(e) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: TIMELINE_ADD_EVENT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const reqPromise = getState().common.timelineConsent ?
        pushEvent(e, getState) : Promise.resolve();
      reqPromise.then(
        (res) => {
          if (res) {
            e.ref = res.key;
          }
          dispatch({
            type: TIMELINE_ADD_EVENT_SUCCESS,
            event: e
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: TIMELINE_ADD_EVENT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

async function pushEvent(e, getState) {
  // const eventStr = JSON.stringify(e);
  // const ecomp = snappy.compressSync(eventStr);
  // console.log(ecomp);
  const ref = database.ref(TIMELINE + getState().common.user.uid);
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const eventData = str2ab(JSON.stringify(e));
  const encrypted = await crypto.subtle.encrypt(
    {
      name: CRAL,
      iv: iv
    },
    getState().common.userKey,
    eventData
  );
  console.log(encrypted);
  const pushData = {
    data: Array.from(new Uint8Array(iv)).concat(
      Array.from(new Uint8Array(encrypted))).join('-'),
    ms: e.ms
  };
  return ref.push(pushData);
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissAddEventError() {
  return {
    type: TIMELINE_ADD_EVENT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMELINE_ADD_EVENT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        addEventPending: true,
        addEventError: null,
      };

    case TIMELINE_ADD_EVENT_SUCCESS:
      // The request is success
      let ind = binfind(action.event.ms, state.events, "ms");
      return {
        ...state,
        events: [
          ...state.events.slice(0, ind),
          action.event,
          ...state.events.slice(ind)
        ],
        addEventPending: false,
        addEventError: null,
      };

    case TIMELINE_ADD_EVENT_FAILURE:
      // The request is failed
      return {
        ...state,
        addEventPending: false,
        addEventError: action.data.error,
      };

    case TIMELINE_ADD_EVENT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        addEventError: null,
      };

    default:
      return state;
  }
}
