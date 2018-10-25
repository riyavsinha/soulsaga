// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
  experienceGoals: [
    {
      id: 1,
      c: 'Nature',
      t: "EXP",
      g: "Swim with dolphins"
    },
    {
      id: 2,
      c: 'Work/Career',
      t: "EXP",
      g: "Swim with dolphins in the bahamas with a sea turtle in the background on the day of the summer solstice"
    }
  ],
  growthGoals: [],
  contributionGoals: [],
  deleteGoalPending: false,
  deleteGoalError: null,
  saveGoalPending: false,
  saveGoalError: null,
};

export default initialState;