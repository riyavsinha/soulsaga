import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    return (
      <Dialog
          open={e != null}
          onClose={this.handleClose}>
        <DialogTitle>
          Are you sure you want to delete this event?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting an event is permananent and is not recoverable. Are you
            sure you want to delete the event: "{e ? e.title : ""}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={this.handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
