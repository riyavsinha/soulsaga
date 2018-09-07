import AddEventForm from './AddEventForm';
import EventProto from 'proto/EventProto';
import EventDeleteDialog from './EventDeleteDialog';
import EventViewDialog from './EventViewDialog';
import SaveLoadSection from './SaveLoadSection';
import TimelineDisplay from './TimelineDisplay';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { auth, database, TIMELINE} from 'common/firebase';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  // load user events on page render
  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const ref = database
          .ref(TIMELINE + this.props.common.user.uid)
          .orderByChild("ms");
        ref.once('value', (snapshot) => {
          let events = [];
          snapshot.forEach(child => {
            let e = new EventProto(child.val());
            e.ref = child.key;
            events.push(e);
          })
          this.props.actions.populateEvents(events);
        })
      }
    });
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
        <SaveLoadSection />
        <TimelineDisplay events={this.props.timeline.events} />
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
