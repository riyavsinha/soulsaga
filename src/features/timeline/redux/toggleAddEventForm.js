// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  TIMELINE_TOGGLE_ADD_EVENT_FORM,
} from './constants';

export function toggleAddEventForm(openState) {
  return {
    type: TIMELINE_TOGGLE_ADD_EVENT_FORM,
    isOpen: openState,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMELINE_TOGGLE_ADD_EVENT_FORM:
      return {
        ...state,
        isAddEventFormOpen: action.isOpen,
      };

    default:
      return state;
  }
}
