import {
  GOAL_DISCOVERY_FETCH_GOALS_BEGIN,
  GOAL_DISCOVERY_FETCH_GOALS_SUCCESS,
  GOAL_DISCOVERY_FETCH_GOALS_FAILURE,
  GOAL_DISCOVERY_FETCH_GOALS_DISMISS_ERROR,
} from './constants';
import GoalProto from 'proto/GoalProto';
import { database, CRAL, GOALS} from 'common/firebase';
import { ab2str } from 'common/util/strbuffer';
const _ = require('lodash');

export function fetchGoals(args = {}) {
  return (dispatch, getState) => {
    dispatch({
      type: GOAL_DISCOVERY_FETCH_GOALS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const fetchPromise = getState().common.goalsConsent ?
        performFetch(getState) : Promise.resolve();
      fetchPromise.then(
        (res) => {
          dispatch({
            type: GOAL_DISCOVERY_FETCH_GOALS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: GOAL_DISCOVERY_FETCH_GOALS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

async function performFetch(getState) {
  const ref = database
          .ref(GOALS).child(getState().common.user.uid)
          .orderByChild("id");
  const fetchData = await ref.once('value');
  let goals = [];
  let refs = [];
  fetchData.forEach(child => {
    goals.push(child.val());
    refs.push(child.key);
  })
  for (let i in goals) {
    goals[i] = await decodeGoal(goals[i], getState);
    goals[i].ref = refs[i];
  }
  return goals
}

async function decodeGoal(child, getState) {
  const arr = child.data.split('-');
  const iv = new Uint8Array(arr.slice(0, 16));
  const decrypted = await crypto.subtle.decrypt(
    {
      name: CRAL,
      iv: iv
    },
    getState().common.userKey,
    new Uint8Array(arr.slice(16)).buffer
  );
  const g = new GoalProto(JSON.parse(ab2str(decrypted)));
  return g;
}

export function dismissFetchGoalsError() {
  return {
    type: GOAL_DISCOVERY_FETCH_GOALS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case GOAL_DISCOVERY_FETCH_GOALS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchGoalsPending: true,
        fetchGoalsError: null,
      };

    case GOAL_DISCOVERY_FETCH_GOALS_SUCCESS:
      // The request is success
      let exp = [], gro = [], con = [];
      for (let i in action.data) {
        let g = action.data[i];
        switch (g.t) {
          case "EXP":
            exp.push(g);
            break;
          case "GRO":
            gro.push(g);
            break;
          case "CON":
            con.push(g);
            break;
          default:
            throw new Error("Invalid goal type.");
        }
      }
      return {
        ...state,
        hasLoadedGoals: true,
        experienceGoals: exp,
        growthGoals: gro,
        contributionGoals: con,
        fetchGoalsPending: false,
        fetchGoalsError: null,
      };

    case GOAL_DISCOVERY_FETCH_GOALS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchGoalsPending: false,
        fetchGoalsError: action.data.error,
      };

    case GOAL_DISCOVERY_FETCH_GOALS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchGoalsError: null,
      };

    default:
      return state;
  }
}
