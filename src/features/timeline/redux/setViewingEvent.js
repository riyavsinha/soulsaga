// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  TIMELINE_SET_VIEWING_EVENT,
} from './constants';

/**
 * Action used to set a specific event as the main viewing event,
 * opening an expanded view of the event.
 * 
 * Setting to null indicates that there is no set viewing event.
 * 
 * @param {?EventProto=}
 */
export function setViewingEvent(e = null) {
  return {
    type: TIMELINE_SET_VIEWING_EVENT,
    event: e
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMELINE_SET_VIEWING_EVENT:
      return {
        ...state,
        viewingEvent: action.event,
      };

    default:
      return state;
  }
}
