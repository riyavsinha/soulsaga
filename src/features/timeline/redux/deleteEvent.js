import {
  TIMELINE_DELETE_EVENT_BEGIN,
  TIMELINE_DELETE_EVENT_SUCCESS,
  TIMELINE_DELETE_EVENT_FAILURE,
  TIMELINE_DELETE_EVENT_DISMISS_ERROR,
} from './constants';

/**
 * Action to delete an event.
 * 
 * @param id {Number} The ID of the event to delete
 */
export function deleteEvent(id) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: TIMELINE_DELETE_EVENT_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = Promise.resolve();
      doRequest.then(
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
