import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { Component } from 'react';

export default class SimpleDialog extends Component {
  static propTypes = {

  };

  render() {
    let content = this.props.contentText ? this.props.contentText : this.props.children;
    let cancelAction = this.props.cancelButtonAction ?
      this.props.cancelButtonAction : this.props.handleClose;
    return (
      <Dialog
          open={this.props.open}
          onClose={this.props.onClose}>
        <DialogTitle>
          {this.props.titleText}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={cancelAction}>
            {this.props.cancelButtonText}
          </Button>
          <Button color="primary" onClick={this.props.nextButtonAction}>
            {this.props.nextButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
