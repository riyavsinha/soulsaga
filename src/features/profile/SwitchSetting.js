import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';

export default class SwitchSetting extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="profile-profile-page__toggle-setting-container">
        <div className="profile-profile-page__toggle-setting-text">
          <Typography variant="body2" className="profile-profile-page__toggle-setting-title">
            {this.props.title}
          </Typography>
          <Typography>
            {this.props.subtitle}
          </Typography>
        </div>
        <Switch
          checked={this.props.checked}
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </div>
    );
  }
}
