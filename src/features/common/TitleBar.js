import {
  AccountIcon,
  ChartLineVariantIcon,
  HomeIcon,
  InformationIcon,
 } from 'mdi-react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FirstTimeUserSetupDialog from './FirstTimeUserSetupDialog';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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

  state = {
    profileMenuAnchorEl: null,
    navDrawerOpen: false,
  }

  /**
   * @override
   * Checks if the user is already logged in, and repopulates
   * user info and saved consent state.
   */
  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
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
      .then(() => this.populateConsentState())
      .then(() => this.props.actions.populateSignInState(true));
  }

  /**
   * Helper method to populate an input user's saved consent state.
   * @return {!Promise}
   */
  populateConsentState = (uid = this.props.common.user.uid) => {
    const ref = database.ref(DATA_CONSENT + uid).child('currentState')
    return ref.once("value")
      .then(snapshot => this.props.actions.populateDataConsent(snapshot.val()));
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
      .then(() => {
        this.props.actions.populateSignInState(false);
        this.props.actions.populateEvents([]);
      });
  }

  handleDrawerOpen = isOpen => () => {
    this.setState({navDrawerOpen: isOpen});
  }

  /** RENDERS */

  renderSetupDialog = () => {
    if (this.props.common.signInState &&
        this.props.common.storeUserData === null) {
      return (<FirstTimeUserSetupDialog/>);
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

  renderNavItems = () => {
    return (
      <List component="nav">
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/about">
          <ListItemIcon>
            <InformationIcon />
          </ListItemIcon>
          <ListItemText>About</ListItemText>
        </ListItem>
        <Divider/>
        <ListSubheader>
          Tools
        </ListSubheader>
        <ListItem button component={Link} to="/timeline">
          <ListItemIcon>
            <ChartLineVariantIcon />
          </ListItemIcon>
          <ListItemText>Timeline</ListItemText>
        </ListItem>
        <Divider/>
        <ListSubheader>
          Me
        </ListSubheader>
        <ListItem button component={Link} to="/profile">
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </ListItem>
      </List>
    )
  }

  render() {
    return (
      <div>
        <AppBar className="title-bar__app-bar">
          <Toolbar>
            <IconButton
                color="inherit"
                className="title-bar__menu-icon"
                onClick={this.handleDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
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

        <Drawer
            open={this.state.navDrawerOpen}
            onClose={this.handleDrawerOpen(false)}>
          <div
              role="button"
              onClick={this.handleDrawerOpen(false)}
              onKeyDown={this.handleDrawerOpen(false)}
              className="title-bar__navigation-menu">
            {this.renderNavItems()}
          </div>
        </Drawer>
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
