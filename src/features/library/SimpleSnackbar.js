import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default class SimpleSnackbar extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.props.open}
        autoHideDuration={2000}
        onClose={this.props.onClose}
        message={<span id="message-id">{this.props.children}</span>}
      />
    );
  }
}
