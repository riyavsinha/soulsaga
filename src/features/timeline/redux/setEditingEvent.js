// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  TIMELINE_SET_EDITING_EVENT,
} from './constants';

export function setEditingEvent(e = null) {
  return {
    type: TIMELINE_SET_EDITING_EVENT,
    editingEvent: e,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMELINE_SET_EDITING_EVENT:
      return {
        ...state,
        editingEvent: action.editingEvent,
      };

    default:
      return state;
  }
}
