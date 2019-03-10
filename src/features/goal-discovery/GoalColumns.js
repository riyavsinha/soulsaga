import GoalColumn from './GoalColumn';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { auth } from 'common/firebase';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';


class GoalColumns extends Component {
  static propTypes = {
    goalDiscovery: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user && 
          this.props.common.goalsConsent && 
          !this.props.goalDiscovery.hasLoadedGoals) {
        this.props.actions.fetchGoals();
      }
    });
  }

  render() {
    return (
      <div className="gd-goal-columns">
        <GoalColumn 
            title="Experiences"
            subtitle="What experiences do you want to have in life?"
            data={this.props.goalDiscovery.experienceGoals}
            type="EXP" />
        <GoalColumn 
            title="Growth"
            subtitle="What skills/traits do you want to develop?"
            data={this.props.goalDiscovery.growthGoals}
            type="GRO" />
        <GoalColumn
            title="Contributions"
            subtitle="How do you want to give back to the world?"
            data={this.props.goalDiscovery.contributionGoals}
            type="CON" />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    goalDiscovery: state.goalDiscovery,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalColumns);