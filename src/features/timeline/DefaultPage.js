import AddEventForm from './AddEventForm.js';
import EventProto from 'proto/EventProto'
import TimelineEvent from './TimelineEvent.js';
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

  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const ref = database.ref(TIMELINE + this.props.common.user.uid);
        ref.once('value', (snapshot) => {
          const events = snapshot.val();
          for (var k in events) {
            let e = new EventProto(events[k]);
            e.ref = k;
            this.props.actions.populateEvents(e);
          }
        })
      }
    });
  }

  renderEvents = () => {
    const events = [];
    let event;
    for (var i in this.props.timeline.events) {
      event = this.props.timeline.events[i];
      events.push(
        <TimelineEvent event={event} key={event.id} />);
    }
    return events;
  }

  render() {
    if (this.props.common.signInState === null) {
      return <div/>;
    } else if (this.props.common.signInState === false) {
      return <Redirect to="/" />;
    }

    return (
      <div className="timeline-default-page">
        <div className="timeline-default-page__card-container">
          {this.renderEvents()}
        </div>
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
