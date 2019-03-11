// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as addEventReducer } from './addEvent';
import { reducer as deleteEventReducer } from './deleteEvent';
import { reducer as toggleAddEventFormReducer } from './toggleAddEventForm';
import { reducer as setEditingEventReducer } from './setEditingEvent';
import { reducer as setViewingEventReducer } from './setViewingEvent';
import { reducer as setDeletingEventReducer } from './setDeletingEvent';
import { reducer as deleteUserEventsReducer } from './deleteUserEvents';
import { reducer as setHasLoadedEventsReducer } from './setHasLoadedEvents';
import { reducer as fetchEventsReducer } from './fetchEvents';
import { reducer as resetTimelineDataReducer } from './resetTimelineData';
import { reducer as setChronoOrderReducer } from './setChronoOrder';
import { reducer as setEventTagFiltersReducer } from './setEventTagFilters';
import { reducer as setEventCategoryFiltersReducer } from './setEventCategoryFilters';

const reducers = [
  addEventReducer,
  deleteEventReducer,
  toggleAddEventFormReducer,
  setEditingEventReducer,
  setViewingEventReducer,
  setDeletingEventReducer,
  deleteUserEventsReducer,
  setHasLoadedEventsReducer,
  fetchEventsReducer,
  resetTimelineDataReducer,
  setChronoOrderReducer,
  setEventTagFiltersReducer,
  setEventCategoryFiltersReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
