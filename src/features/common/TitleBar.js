import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DataChangeSnackbars from './DataChangeSnackbars';
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
import { auth,
         API_KEY,
         GDRIVE_DISCOVERY_DOCS,
         CLIENT_ID,
         GDRIVE_APP_SCOPE} from 'common/firebase';
import { resetTimelineData } from 'features/timeline/redux/actions'
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
    window.gapi.load("client", this.initClient);
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.props.actions.populateUser(user);
    //     this.props.actions.fetchDataConsent()
    //       .then(() => this.props.actions.fetchOrCreateKey(window.gapi))
    //       .then(() => this.props.actions.populateSignInState(true));
    //   } else {
    //     this.props.actions.populateSignInState(false);
    //   }
    // });
  };

  initClient = () => {
    window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [GDRIVE_DISCOVERY_DOCS],
      clientId: CLIENT_ID,
      scope: GDRIVE_APP_SCOPE,
    }).then(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.props.actions.populateUser(user);
          this.props.actions.fetchDataConsent()
            .then(() => this.props.actions.fetchOrCreateKey(window.gapi))
            .then(() => this.props.actions.populateSignInState(true));
        } else {
          this.props.actions.populateSignInState(false);
        }
      })
    }).catch(e => console.log(e))
  }

  loadKey = () => {
    console.log(crypto.subtle.generateKey());
  }

  /** ACTIONS */

  /** Opens sign-in OAuth popup */
  initiateSignIn = () => this.props.actions.signIn(window.gapi)

  /** Opens the User menu */
  handleMenuOpen = e => this.setState({profileMenuAnchorEl: e.currentTarget})

  /** Closes the User menu */
  handleMenuClose = () => this.setState({profileMenuAnchorEl: null})

  /** Signs out the user. */
  handleSignOut = () => {
    this.handleMenuClose();
    this.props.actions.signOut(window.gapi)
      .then(() => this.props.actions.resetTimelineData() );
  }

  /** RENDERS */

  renderSetupDialog = () => {
    if (this.props.common.signInState &&
        this.props.common.privacyTermsConsent === null) {
      return (<PrivacyTermsAgreementDialog />);
    } else if (this.props.common.signInState &&
        this.props.common.timelineConsent === null) {
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
        <DataChangeSnackbars />
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
    actions: bindActionCreators({ ...actions, resetTimelineData }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar);
