import Button from '@material-ui/core/Button';
import React, { Component } from 'react';

export default class UploadButton extends Component {
  static propTypes = {

  };

  render() {
    let variant = this.props.variant ? this.props.variant : "raised";
    return (
      <Button
            variant={variant}
            component="label"
            color="primary"
            className={this.props.className}>
          {this.props.children}
          <input
              onChange={this.props.onChange}
              style={{ display: 'none' }}
              type="file"
            />
        </Button>
    );
  }
}
