import AddEventForm from './AddEventForm';
import ChronologicalOrderSelect from './ChronologicalOrderSelect';
import EventDeleteDialog from './EventDeleteDialog';
import EventViewDialog from './EventViewDialog';
import SaveLoadSection from './SaveLoadSection';
import TimelineDisplayWrapper from './TimelineDisplayWrapper';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  ConditionalDisplay = () => {
    if (this.props.common.userKey) {
      return <TimelineDisplayWrapper />
    }
  }

  render() {
    // ensure auth state
    if (this.props.common.signInState === null) {
      return <div/>;
    } else if (this.props.common.signInState === false) {
      return <Redirect to="/" />;
    }

    return (
      <div className="timeline-default-page">
        <div className="timeline-default-page__settings-bar-one">
          <SaveLoadSection className="timeline-default-page__save-load-section" />
          <ChronologicalOrderSelect />
        </div>
        <this.ConditionalDisplay />
        <EventViewDialog />
        <EventDeleteDialog />
        <AddEventForm />
      </div>
    );
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultPage);
