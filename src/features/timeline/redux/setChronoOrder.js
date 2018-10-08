// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  TIMELINE_SET_CHRONO_ORDER,
} from './constants';

export function setChronoOrder(ordering) {
  return {
    type: TIMELINE_SET_CHRONO_ORDER,
    data: ordering
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMELINE_SET_CHRONO_ORDER:
      return {
        ...state,
        eventOrdering: action.data
      };

    default:
      return state;
  }
}
