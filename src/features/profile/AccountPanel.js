import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import Panel from './Panel';
import PropTypes from 'prop-types';
import SimpleDialog from 'features/library/SimpleDialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteUser } from 'features/common/redux/actions';
import * as actions from './redux/actions';

export class AccountPanel extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = { deleteAccountConfirmDialogOpen: false }

  onDeleteButtonClick =
      () => this.setState({ deleteAccountConfirmDialogOpen: true });

  onDeleteConfirmDialogClose =
      () => this.setState({ deleteAccountConfirmDialogOpen: false });

  deleteUser = () => {
    this.props.actions.deleteUser();
  }

  render() {
    let titleText = "Permanently delete your account?"
    let contentText = `This cannot be undone. If you would like to save
        your data prior to deletion, please go to your Timeline and
        click 'Download'.`;
    return (
      <Panel title="My Account">
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
      </Panel>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, deleteUser }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountPanel);
