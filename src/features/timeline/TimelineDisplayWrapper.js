import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimelineDisplay from './TimelineDisplay';
import { auth } from 'common/firebase';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TimelineDisplayWrapper extends Component {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user && this.props.common.timelineConsent && 
          !this.props.timeline.hasLoadedEvents) {
        this.props.actions.fetchEvents();
      }
    });
  }

  render() {
    return <TimelineDisplay events={this.props.timeline.events} />
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    timeline: state.timeline,
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
)(TimelineDisplayWrapper);
