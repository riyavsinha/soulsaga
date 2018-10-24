import Divider from '@material-ui/core/Divider';
import GoalItem from './GoalItem';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class GoalColumn extends Component {
  static propTypes = {
    goalDiscovery: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="gd-goal-column">
        <div className="gd-goal-column__wrapper">
          <div className="gd-goal-column__title-section">
            <Typography variant="headline">
              {this.props.title}
            </Typography>
            <Typography variant="subheading"
                className="gd-goal-column__subtitle">
              {this.props.subtitle}
            </Typography>
          </div>
        
          <GoalItem title="Swim with dolphins" />
          <GoalItem title="Swim with dolphinsasdfasdfasdfasdfa s dfjkadkls;f jaslkdfj alsdkjf alsdkjf" />
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
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
)(GoalColumn);
