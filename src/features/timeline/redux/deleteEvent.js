import {
  TIMELINE_DELETE_EVENT_BEGIN,
  TIMELINE_DELETE_EVENT_SUCCESS,
  TIMELINE_DELETE_EVENT_FAILURE,
  TIMELINE_DELETE_EVENT_DISMISS_ERROR,
} from './constants';
import {database, TIMELINE} from 'common/firebase';

/**
 * Action to delete an event.
 * 
 * @param id {Number} The ID of the event to delete
 */
export function deleteEvent(id, ref = "") {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: TIMELINE_DELETE_EVENT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      let reqPromise;
      if (getState().common.timelineConsent) {
        if (ref === "") {
          throw new Error("ref required when data storage setting on.");
        }
        const dbref = database.ref(TIMELINE + getState().common.user.uid);
        reqPromise = dbref.child(ref).remove();
      } else {
        reqPromise = Promise.resolve();
      }
      reqPromise.then(
        (res) => {
          dispatch({
            type: TIMELINE_DELETE_EVENT_SUCCESS,
            id: id,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: TIMELINE_DELETE_EVENT_FAILURE,
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
export function dismissDeleteEventError() {
  return {
    type: TIMELINE_DELETE_EVENT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMELINE_DELETE_EVENT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deleteEventPending: true,
        deleteEventError: null,
      };

    case TIMELINE_DELETE_EVENT_SUCCESS:
      // The request is success
      // The index of the element to delete
      let ind = state.events.findIndex(e => e.id === action.id);
      return {
        ...state,
        events: [
          ...state.events.slice(0, ind),
          ...state.events.slice(ind+1)
        ],
        deleteEventPending: false,
        deleteEventError: null,
      };

    case TIMELINE_DELETE_EVENT_FAILURE:
      // The request is failed
      return {
        ...state,
        deleteEventPending: false,
        deleteEventError: action.data.error,
      };

    case TIMELINE_DELETE_EVENT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deleteEventError: null,
      };

    default:
      return state;
  }
}
