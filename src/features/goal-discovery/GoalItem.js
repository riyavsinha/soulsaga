import React, { Component } from 'react';

export default class GoalItem extends Component {
  static propTypes = {

  };

  handleClick = () => console.log('hi')

  render() {
    return (
      <div className="goal-discovery-goal-item"
          onDoubleClick={this.handleClick}>
        {this.props.title}
      </div>
    );
  }
}
