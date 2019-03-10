import GoalColumns from './GoalColumns';
import React, { Component } from 'react';
import SaveLoadSection from './SaveLoadSection';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    goalDiscovery: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    // ensure auth state
    if (this.props.common.signInState === null) {
      return <div/>;
    } else if (this.props.common.signInState === false) {
      return <Redirect to="/" />;
    }

    return (
      <div className="gd-default-page">
        <SaveLoadSection />
        <GoalColumns />
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
)(DefaultPage);
