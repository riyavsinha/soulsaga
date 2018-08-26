// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  TIMELINE_POPULATE_EVENTS,
} from './constants';

export function populateEvents(e) {
  return {
    type: TIMELINE_POPULATE_EVENTS,
    event: e,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMELINE_POPULATE_EVENTS:
      return {
        ...state,
        events: [
          ...state.events.slice(),
          action.event,
        ]
      };

    default:
      return state;
  }
}
