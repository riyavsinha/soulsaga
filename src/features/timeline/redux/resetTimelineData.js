import {
  TIMELINE_RESET_TIMELINE_DATA,
} from './constants';

export function resetTimelineData() {
  return {
    type: TIMELINE_RESET_TIMELINE_DATA,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMELINE_RESET_TIMELINE_DATA:
      return {
        ...state,
        events: [],
        availableTags: [],
        hasLoadedEvents: false,
      };

    default:
      return state;
  }
}
