import SimpleDialog from 'features/library/SimpleDialog';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class EventDeleteDialog extends Component {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleClose = () => {
    this.props.actions.setDeletingEvent(null);
  }

  handleDelete = () => {
    let e = this.props.timeline.deletingEvent;
    this.handleClose();
    this.props.actions.deleteEvent(e.id, e.ref);
  }

  render() {
    let e = this.props.timeline.deletingEvent;
    let etitle = e ? e.t : "";
    let title = "Are you sure you want to delete this event?";
    let content = `Deleting an event is permananent and is not
        recoverable. Are you sure you want to delete the event:
        "` + etitle + '"';

    return (
      <SimpleDialog 
            open={e != null}
            onClose={this.handleClose}
            titleText={title}
            contentText={content}
            cancelButtonText="Cancel"
            nextButtonText="Delete"
            nextButtonAction={this.handleDelete}/>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDeleteDialog);
