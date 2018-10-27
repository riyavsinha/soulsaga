import {
  GOAL_DISCOVERY_DELETE_USER_GOALS_BEGIN,
  GOAL_DISCOVERY_DELETE_USER_GOALS_SUCCESS,
  GOAL_DISCOVERY_DELETE_USER_GOALS_FAILURE,
  GOAL_DISCOVERY_DELETE_USER_GOALS_DISMISS_ERROR,
} from './constants';
import {database, GOALS} from 'common/firebase';

export function deleteUserGoals() {
  return (dispatch, getState) => {
    dispatch({
      type: GOAL_DISCOVERY_DELETE_USER_GOALS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const dbref = database.ref(GOALS).child(getState().common.user.uid);
      let reqPromise = dbref.remove();
      reqPromise.then(
        (res) => {
          dispatch({
            type: GOAL_DISCOVERY_DELETE_USER_GOALS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: GOAL_DISCOVERY_DELETE_USER_GOALS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDeleteUserGoalsError() {
  return {
    type: GOAL_DISCOVERY_DELETE_USER_GOALS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case GOAL_DISCOVERY_DELETE_USER_GOALS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deleteUserGoalsPending: true,
        deleteUserGoalsError: null,
      };

    case GOAL_DISCOVERY_DELETE_USER_GOALS_SUCCESS:
      // The request is success
      return {
        ...state,
        experienceGoals: [],
        growthGoals: [],
        contributionGoals: [],
        deleteUserGoalsPending: false,
        deleteUserGoalsError: null,
      };

    case GOAL_DISCOVERY_DELETE_USER_GOALS_FAILURE:
      // The request is failed
      return {
        ...state,
        deleteUserGoalsPending: false,
        deleteUserGoalsError: action.data.error,
      };

    case GOAL_DISCOVERY_DELETE_USER_GOALS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deleteUserGoalsError: null,
      };

    default:
      return state;
  }
}
