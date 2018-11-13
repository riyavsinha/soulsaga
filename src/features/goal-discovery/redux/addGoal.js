import {
  GOAL_DISCOVERY_ADD_GOAL,
} from './constants';

export function addGoal(goal) {
  return {
    type: GOAL_DISCOVERY_ADD_GOAL,
    data: goal
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case GOAL_DISCOVERY_ADD_GOAL:
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
      return {
        ...state,
        [columnName]: [
          ...column,
          action.data
        ]
      };

    default:
      return state;
  }
}
