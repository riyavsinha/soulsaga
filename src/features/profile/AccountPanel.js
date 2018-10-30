import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import Panel from 'features/library/Panel';
import PropTypes from 'prop-types';
import SimpleDialog from 'features/library/SimpleDialog';
import SimpleSnackbar from 'features/library/SimpleSnackbar';
import SwitchSetting from './SwitchSetting';
import { GENERIC_DATA_CONSENT } from 'common/firebase';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteUserEvents, resetTimelineData } from 'features/timeline/redux/actions';
import { deleteUser, deleteUserDataConsent } from 'features/common/redux/actions';
import { provider } from 'common/firebase';
import * as actions from './redux/actions';

export class AccountPanel extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = { 
    deleteAccountConfirmDialogOpen: false,
    deleteFailedSnackbarOpen: false,
    generalDataSettingTitle: "New Tools",
    generalDataSettingSubtitle: `
      When new tools are released, initialize them to
      save my data for me
    `
  }

  onDeleteButtonClick =
      () => this.setState({ deleteAccountConfirmDialogOpen: true });

  onDeleteConfirmDialogClose =
      () => this.setState({ deleteAccountConfirmDialogOpen: false });

  onDeleteFail = () => this.setState({ deleteFailedSnackbarOpen: true });

  onSnackbarClose = () => this.setState({ deleteFailedSnackbarOpen: false });

  handleDataSettingChange = e => {
    this.props.actions.setUserDataConsent(
      this.props.common.user,
      GENERIC_DATA_CONSENT,
      e.target.checked,
      [
        this.state.generalDataSettingTitle,
        this.state.generalDataSettingSubtitle
      ])
        .then(() => this.props.actions.dataOperationSnackbarSucceeded())
        .catch(() => this.props.actions.dataOperationSnackbarFailed());
  } 

  deleteUser = async () => {
    await this.props.common.user.reauthenticateWithPopup(provider);
    await this.props.actions.deleteUserEvents();
    await this.props.actions.deleteUserDataConsent();
    this.props.actions.deleteUser()
        .then(() => this.props.actions.resetTimelineData())
        .catch(err => {
            this.onDeleteFail();
            this.onDeleteConfirmDialogClose();
        });
  }

  render() {
    let titleText = "Permanently delete your account?"
    let contentText = (
        <span>
          This cannot be undone. If you would like to save
          your data prior to deletion, please go to your Timeline and
          click 'Download'.
          <br/><br/>
          <b>This is a sensitive operation, and will require
          reauthentication.</b>
        </span>);
    return (
      <Panel title="My Account">
        <SwitchSetting
            title={this.state.generalDataSettingTitle}
            subtitle={this.state.generalDataSettingSubtitle}
            checked={this.props.common.goalsConsent}
            onChange={this.handleDataSettingChange}
            value="timelineDataConsent" />
        <Button
            color="primary"
            className="profile-account-panel__delete-button"
            onClick={this.onDeleteButtonClick}>
          Delete my account
        </Button>

        <SimpleDialog 
            open={this.state.deleteAccountConfirmDialogOpen}
            onClose={this.onDeleteConfirmDialogClose}
            titleText={titleText}
            contentText={contentText}
            cancelButtonText="Cancel"
            nextButtonText="Delete"
            nextButtonAction={this.deleteUser} />

        <SimpleSnackbar
            open={this.state.deleteFailedSnackbarOpen}
            onClose={this.onSnackbarClose}>
          Delete failed.
        </SimpleSnackbar>

      </Panel>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    profile: state.profile,
    common: state.common
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ 
      ...actions,
      deleteUser,
      deleteUserEvents,
      deleteUserDataConsent,
      resetTimelineData }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPanel);
