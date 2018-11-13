import {
  GOAL_DISCOVERY_SAVE_GOAL_BEGIN,
  GOAL_DISCOVERY_SAVE_GOAL_SUCCESS,
  GOAL_DISCOVERY_SAVE_GOAL_FAILURE,
  GOAL_DISCOVERY_SAVE_GOAL_DISMISS_ERROR,
} from './constants';
import GoalProto from 'proto/GoalProto';
import {
  database,
  GOALS,
  CRAL
} from 'common/firebase';
import { str2ab } from 'common/util/strbuffer';

export function saveGoal(goal) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: GOAL_DISCOVERY_SAVE_GOAL_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const reqPromise = getState().common.goalsConsent ?
        pushGoal(goal, getState) : Promise.resolve();
      reqPromise.then(
        (res) => {
          if (res) {
            goal.ref = res.key;
          }
          dispatch({
            type: GOAL_DISCOVERY_SAVE_GOAL_SUCCESS,
            data: goal,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: GOAL_DISCOVERY_SAVE_GOAL_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

async function pushGoal(goal, getState) {
  // Encryption
  const g = GoalProto.copyOf(goal);
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  const goalData = str2ab(JSON.stringify(g));
  const encryptedText = await crypto.subtle.encrypt(
    {
      name: CRAL,
      iv: iv
    },
    getState().common.userKey,
    goalData
  );
  // DB Push
  const pushData = {
    data: Array.from(new Uint8Array(iv)).concat(
      Array.from(new Uint8Array(encryptedText))).join('-'),
    id: g.id
  };
  const ref = database.ref(GOALS).child(getState().common.user.uid);
  let dbPushRef;
  if (goal.ref) {
    dbPushRef = await ref.child(goal.ref).set(pushData);
  } else {
    dbPushRef = await ref.push(pushData);
  }
  return dbPushRef;
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSaveGoalError() {
  return {
    type: GOAL_DISCOVERY_SAVE_GOAL_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case GOAL_DISCOVERY_SAVE_GOAL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        saveGoalPending: true,
        saveGoalError: null,
      };

    case GOAL_DISCOVERY_SAVE_GOAL_SUCCESS:
      // The request is success
      let column;
      let columnName;
      switch (action.data.t) {
        case "EXP":
          columnName = "experienceGoals";
          column = state.experienceGoals;
          break;
        case "GRO":
          columnName = "growthGoals";
          column = state.growthGoals;
          break;
        case "CON":
          columnName = "contributionGoals";
          column = state.contributionGoals;
          break;
        default:
          throw new Error('Not a valid column.');
      }
      let ind = column.findIndex(g => g.id === action.data.id);
      return {
        ...state,
        [columnName]: [
          ...column.slice(0, ind),
          action.data,
          ...column.slice(ind+1)
        ],
        saveGoalPending: false,
        saveGoalError: null,
      };

    case GOAL_DISCOVERY_SAVE_GOAL_FAILURE:
      // The request is failed
      return {
        ...state,
        saveGoalPending: false,
        saveGoalError: action.data.error,
      };

    case GOAL_DISCOVERY_SAVE_GOAL_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        saveGoalError: null,
      };

    default:
      return state;
  }
}
