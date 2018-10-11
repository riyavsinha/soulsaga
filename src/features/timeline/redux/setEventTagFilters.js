
import {
  TIMELINE_SET_EVENT_TAG_FILTERS,
} from './constants';

export function setEventTagFilters(filters) {
  return {
    type: TIMELINE_SET_EVENT_TAG_FILTERS,
    data: filters
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMELINE_SET_EVENT_TAG_FILTERS:
      return {
        ...state,
        eventFilters: action.data,
      };

    default:
      return state;
  }
}
