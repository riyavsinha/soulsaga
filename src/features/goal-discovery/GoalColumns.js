import GoalColumn from './GoalColumn';
import React, { Component } from 'react';

export default class GoalColumns extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="gd-goal-columns">
        <GoalColumn
          title="Experiences"
          subtitle="What do you want to experience in your lifetime?" />
        <GoalColumn
          title="Growth"
          subtitle="How do you want to grow? What skills do you want to develop?" />
        <GoalColumn
          title="Contributions"
          subtitle="How do you want to give back to the world?" />
      </div>
    );
  }
}
