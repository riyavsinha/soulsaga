import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { setUserDataConsent } from 'features/common/redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TimelineSettingsPanel extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    timelineDataSettingTitle: "Data Storage",
    timelineDataSettingSubtitle: `
      Allow SoulSaga to store my timeline events for me
    `
  }

  handleDataSettingChange = e => {
    this.props.actions.setUserDataConsent(
      this.props.common.user,
      e.target.checked,
      [
        this.state.timelineDataSettingTitle,
        this.state.timelineDataSettingSubtitle
      ]);
  } 

  render() {
    let settingText = this.props.common.storeUserData
        ? "We are helping you save your data"
        : "We are not saving your data"
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
                variant="title"
                className="profile-profile-page__panel-title">
              Timeline
            </Typography>
            <Typography variant="subheading">
              {settingText}
            </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="profile-profile-page__panel-details">
          <div className="profile-profile-page__toggle-setting-container">
            <div className="profile-profile-page__toggle-setting-text">
              <Typography variant="body2" className="profile-profile-page__toggle-setting-title">
                {this.state.timelineDataSettingTitle}
              </Typography>
              <Typography>
                {this.state.timelineDataSettingSubtitle}
              </Typography>
            </div>
            <Switch
              checked={this.props.common.storeUserData}
              onChange={this.handleDataSettingChange}
              value="timelineDataConsent"
            />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    profile: state.profile,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, setUserDataConsent }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineSettingsPanel);
