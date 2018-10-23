import GoalColumn from './GoalColumn';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';


export default class GoalColumns extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="gd-goal-columns">
        <GoalColumn 
            title="Experiences"
            subtitle={`What experiences do you want to have in life?`} />
        <GoalColumn 
            title="Growth"
            subtitle="What skills/traits do you want to develop?" />
        <GoalColumn
            title="Contributions"
            subtitle="How do you want to give back to the world?" />
      </div>
    );
  }
}
