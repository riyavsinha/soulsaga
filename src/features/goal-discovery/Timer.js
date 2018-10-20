import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Timer extends Component {
  static propTypes = {
    goalDiscovery: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {started: false, timeLeft: 60};

  StartButton = () => (
    <Button 
        color="primary"
        variant="contained">
      Start
    </Button>
  );

  MinTimer = () => (<div/>);

  render() {
    let content = this.state.started ? (<this.MinTimer />) : (<this.StartButton />);
    return (
      <div className="goal-discovery-timer">
        {content}
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
)(Timer);
