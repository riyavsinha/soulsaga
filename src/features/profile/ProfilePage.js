import AccountPanel from './AccountPanel';
import Avatar from '@material-ui/core/Avatar';
import GoalSettingsPanel from './GoalSettingsPanel';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimelineSettingsPanel from './TimelineSettingsPanel';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class ProfilePage extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    // ensure auth state
    if (this.props.common.signInState === null) {
      return <div/>;
    } else if (this.props.common.signInState === false) {
      return <Redirect to="/" />;
    }

    return (
      <div className="profile-profile-page">
        <div className="profile-profile-page__metadata-section">
          <Avatar
            alt="profilepicture"
            src={this.props.common.user.photoURL}
            className="profile-profile-page__avatar"
          />
          <div className="profile-profile-page__name-container">
            <Typography variant="display2" className="profile-profile-page__name">
              {this.props.common.user.displayName}
            </Typography>
          </div>
        </div>
        <div className="profile-profile-page__data-section">
          <TimelineSettingsPanel />
          <GoalSettingsPanel />
          <AccountPanel />
        </div>
      </div>
    );
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
