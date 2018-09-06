import {
  TIMELINE_ADD_EVENT_BEGIN,
  TIMELINE_ADD_EVENT_SUCCESS,
  TIMELINE_ADD_EVENT_FAILURE,
  TIMELINE_ADD_EVENT_DISMISS_ERROR,
} from './constants';
import {
  database,
  TIMELINE
} from 'common/firebase';
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
      const ref = database.ref(TIMELINE + getState().common.user.uid);
      const reqPromise = getState().common.storeUserData ?
        ref.push(e) : Promise.resolve();
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
