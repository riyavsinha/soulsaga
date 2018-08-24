
import {
  COMMON_POPULATE_USER,
} from './constants';

/**
 * Intended for persistent sign-in experience.
 */
export function populateUser(user) {
  return {
    type: COMMON_POPULATE_USER,
    name: user.displayName,
    photoUrl: user.photoURL,
    id: user.uid,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_POPULATE_USER:
      return {
        ...state,
        user: {
          name: action.name,
          photoUrl: action.photoUrl,
          id: action.id,
        }
      };

    default:
      return state;
  }
}
