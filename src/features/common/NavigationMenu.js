import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuIcon from '@material-ui/icons/Menu';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {
  AccountIcon,
  ChartLineVariantIcon,
  HomeIcon,
  InformationIcon,
 } from 'mdi-react';

export default class NavigationMenu extends Component {
  static propTypes = {

  };

  state = {
    navDrawerOpen: false,
  }

  handleDrawerOpen = isOpen => () => {
    this.setState({navDrawerOpen: isOpen});
  }

  NavItems = () => {
    return (
      <List component="nav" className="title-bar__navigation-list">
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
        <ListSubheader component={Link} to="/privacy"
            className="title-bar__legal-nav title-bar__legal-nav-first">
          Privacy Policy
        </ListSubheader>
        <ListSubheader component={Link} to="/terms"
            className="title-bar__legal-nav">
          Terms of Service
        </ListSubheader>
      </List>
    );
  }

  render() {
    const buttonClass = this.props.menuButtonClassName ?
        this.props.menuButtonClassName : "";
    return (
      <div>
        <IconButton
            color="inherit"
            className={buttonClass}
            onClick={this.handleDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>

        <Drawer
              open={this.state.navDrawerOpen}
              onClose={this.handleDrawerOpen(false)}>
            <div
                role="button"
                onClick={this.handleDrawerOpen(false)}
                onKeyDown={this.handleDrawerOpen(false)}
                className="title-bar__navigation-menu">
              <this.NavItems />
            </div>
          </Drawer>
        </div>
    );
  }
}
