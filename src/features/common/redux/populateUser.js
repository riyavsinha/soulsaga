
import {
  COMMON_POPULATE_USER,
} from './constants';

/**
 * Intended for persistent sign-in experience.
 */
export function populateUser(user) {
  return {
    type: COMMON_POPULATE_USER,
    user: user,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_POPULATE_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
}
