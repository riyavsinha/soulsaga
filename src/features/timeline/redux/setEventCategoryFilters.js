
import {
  TIMELINE_SET_EVENT_CATEGORY_FILTERS,
} from './constants';

export function setEventCategoryFilters(filters) {
  return {
    type: TIMELINE_SET_EVENT_CATEGORY_FILTERS,
    data: filters,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMELINE_SET_EVENT_CATEGORY_FILTERS:
      return {
        ...state,
        eventCategoryFilters: action.data,
      };

    default:
      return state;
  }
}
