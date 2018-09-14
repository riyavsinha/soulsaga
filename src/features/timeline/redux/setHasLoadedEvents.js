// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  TIMELINE_SET_HAS_LOADED_EVENTS,
} from './constants';

export function setHasLoadedEvents(hasLoaded) {
  return {
    type: TIMELINE_SET_HAS_LOADED_EVENTS,
    data: hasLoaded,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMELINE_SET_HAS_LOADED_EVENTS:
      return {
        ...state,
        hasLoadedEvents: action.data,
      };

    default:
      return state;
  }
}
