import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import GeneralStorageSettingsDialog from './GeneralStorageSettingsDialog';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NavigationMenu from './NavigationMenu';
import PrivacyTermsAgreementDialog from './PrivacyTermsAgreementDialog';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { auth, database, DATA_CONSENT } from 'common/firebase';
import { populateEvents } from 'features/timeline/redux/actions'
import * as actions from './redux/actions';

export class TitleBar extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = { profileMenuAnchorEl: null }

  /**
   * @override
   * Checks if the user is already logged in, and repopulates
   * user info and saved consent state.
   */
  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.actions.populateUser(user);
        this.populateConsentState(user.uid)
          .then(() => this.props.actions.populateSignInState(true));
      } else {
        this.props.actions.populateSignInState(false);
      }
    });
  };

  /** ACTIONS */

  /**
   * Opens sign-in OAuth popup and populates saved consent state.
   */
  initiateSignIn = () => {
    this.props.actions.signIn()
      .then(() => this.populateConsentState());
  }

  /**
   * Helper method to populate an input user's saved consent state.
   * @return {!Promise}
   */
  populateConsentState = (uid = this.props.common.user.uid) => {
    const consentTypes = ['privacyTerms', 'timeline'];
    let promises = [];
    const topRef = database.ref(DATA_CONSENT + uid);
    for (var i in consentTypes) {
      promises.push(
        topRef.child(consentTypes[i]).child('currentState').once("value"));
    }
    return Promise.all(promises).then(
      snapshots => {
        this.props.actions.populateDataConsent(
            snapshots.map(s => s.val()))
      });
  }

  /**
   * Opens the User menu
   */
  handleMenuOpen = e => this.setState({profileMenuAnchorEl: e.currentTarget})

  /**
   * Closes the User menu
   */
  handleMenuClose = () => this.setState({profileMenuAnchorEl: null})

  /**
   * Signs out the user.
   */
  handleSignOut = () => {
    this.handleMenuClose();
    this.props.actions.signOut()
      .then(() => this.props.actions.populateEvents([]) );
  }

  /** RENDERS */

  renderSetupDialog = () => {
    if (this.props.common.signInState &&
        this.props.common.privacyTermsConsent === null) {
      return (<PrivacyTermsAgreementDialog />);
    } else if (this.props.common.signInState &&
        this.props.common.timelineDataConsent === null) {
      return (<GeneralStorageSettingsDialog/>);
    }
  }

  renderUserInfo = () => {
    return (
      <div className="title-bar__user-info">
        {this.renderSetupDialog()}
        <IconButton>
          <Avatar 
            src={this.props.common.user.photoURL}
            className="title-bar__user-info-avatar"
            onClick={this.handleMenuOpen} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.profileMenuAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(this.state.profileMenuAnchorEl)}
          onClose={this.handleMenuClose}
        >
          <MenuItem component={Link} to="/profile" onClick={this.handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={this.handleSignOut}>Sign out</MenuItem>
        </Menu>
      </div>
    );
  };

  renderProfileButton = () => {
    if (this.props.common.user == null) {
      return (
        <Button color="inherit" onClick={this.initiateSignIn}>
          Sign in
        </Button>
      );
    } else {
      return this.renderUserInfo();
    }
  };

  render() {
    return (
      <div>
        <AppBar className="title-bar__app-bar">
          <Toolbar>
            <NavigationMenu menuButtonClassName="title-bar__menu-icon" />
            <div className="title-bar__app-bar-text">
              <Typography variant="title" color="inherit">
                SoulSaga
              </Typography>
              <Typography variant="subheading" color="inherit" className="title-bar__app-bar-alpha">
                Alpha
              </Typography>
            </div>
            {this.renderProfileButton()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, populateEvents }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar);
