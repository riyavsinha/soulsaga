import {
  AccountIcon,
  AccountGroupIcon,
  AtomIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CreationIcon,
  CurrencyUsdIcon,
  DumbbellIcon,
  EarthIcon,
  FoodIcon,
  HeartIcon,
  HomeIcon,
  HospitalIcon,
  LockIcon,
  PaletteIcon,
  PineTreeIcon,
  SchoolIcon,
  VectorCircleIcon} from 'mdi-react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { Component } from 'react';

export default class GoalItem extends Component {
  static propTypes = {

  };

  state = { isHovering: false }

  handleMouseHoverIn = () => this.setState({isHovering: true});

  handleMouseHoverOut = () => this.setState({isHovering: false});

  render() {
    return (
      <div className="gd-goal-item"
          onMouseEnter={this.handleMouseHoverIn}
          onMouseLeave={this.handleMouseHoverOut} >
        <PineTreeIcon className="gd-goal-item__icon"/>
        <div className="gd-goal-item__text">
          {this.props.title}
        </div>
        {
          this.state.isHovering &&
            <IconButton className="gd-goal-item__options-button">
              <MoreVertIcon />
            </IconButton>  
        }
      </div>
    );
  }
}
