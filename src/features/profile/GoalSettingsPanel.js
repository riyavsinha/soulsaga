import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import Panel from 'features/library/Panel';
import PropTypes from 'prop-types';
import SimpleDialog from 'features/library/SimpleDialog';
import SwitchSetting from './SwitchSetting';
import { GOALS_CONSENT } from 'common/firebase';
import { setUserDataConsent } from 'features/common/redux/actions';
import { deleteUserGoals } from 'features/goal-discovery/redux/actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  dataOperationSnackbarFailed,
  dataOperationSnackbarSucceeded } from 'features/common/redux/actions';
import * as actions from './redux/actions';

export class GoalSettingsPanel extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    dialogOpen: false,
    goalDataSettingTitle: "Data Storage",
    goalDataSettingSubtitle: `
      Allow SoulSaga to store my goals for me
    `
  }

  handleDataSettingChange = e => {
    this.props.actions.setUserDataConsent(
      this.props.common.user,
      GOALS_CONSENT,
      e.target.checked,
      [
        this.state.goalDataSettingTitle,
        this.state.goalDataSettingSubtitle
      ])
        .then(() => this.props.actions.dataOperationSnackbarSucceeded())
        .catch(() => this.props.actions.dataOperationSnackbarFailed());
  } 

  handleDeleteButtonClick = () => this.setState({ dialogOpen: true })

  handleDialogClose = () => this.setState({ dialogOpen: false })

  deleteEvents = () => {
    this.handleDialogClose();
    this.props.actions.deleteUserGoals()
        .then(() => this.props.actions.dataOperationSnackbarSucceeded())
        .catch(() => this.props.actions.dataOperationSnackbarFailed());
  }

  render() {
    let settingText = this.props.common.goalsConsent
        ? "We are helping you save your data"
        : "We are not saving your data";
    let dialogTitleText = "Delete all your goals?";
    let dialogContentText = `This cannot be undone. If you would like
       to save your data before erasing it, please do so with the
       'Download' button on the Goal Discovery page.`
    return (
      <div>
        <Panel 
            title="Goal Discovery"
            settingText={settingText}>
          <SwitchSetting
            title={this.state.goalDataSettingTitle}
            subtitle={this.state.goalDataSettingSubtitle}
            checked={this.props.common.goalsConsent}
            onChange={this.handleDataSettingChange}
            value="timelineDataConsent" />

          <Button
              color="primary"
              className="profile-profile-page__timeline-delete-events-button"
              onClick={this.handleDeleteButtonClick}>
            Delete all my goals
          </Button>
        </Panel>

        <SimpleDialog 
            open={this.state.dialogOpen}
            onClose={this.handleDialogClose}
            titleText={dialogTitleText}
            contentText={dialogContentText}
            cancelButtonText="Cancel"
            nextButtonText="Delete"
            nextButtonAction={this.deleteEvents}/>
      </div>
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
    actions: bindActionCreators(
      { ...actions,
       setUserDataConsent,
        deleteUserGoals,
        dataOperationSnackbarFailed,
        dataOperationSnackbarSucceeded }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalSettingsPanel);
