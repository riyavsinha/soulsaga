import AppBar from '@material-ui/core/AppBar';
import AddEventForm from './AddEventForm.js';
import TimelineEvent from './TimelineEvent.js';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

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
    return (
      <div>

        <AppBar className="timeline-add-event-dialog__app-bar">
          <Toolbar>
            <Typography variant="title" color="inherit" className="timeline-add-event-dialog__app-bar-text">
              SoulSaga
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="timeline-default-page">
          <div className="timeline-default-page__card-container">
            {this.renderEvents()}
          </div>
          <AddEventForm />
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
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
