import {
  AccountIcon,
  AccountGroupIcon,
  AtomIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CheckIcon,
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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

class GoalItem extends Component {
  static propTypes = {

  };

  state = {
    goalText: this.props.data.g,
    goalCategory: this.props.data.c,
    displayMode: this.props.displayMode !== null ? this.props.displayMode : true,
    isHovering: false,
    optionsAnchorEl: null
  }

  handleMouseHoverIn = () => this.setState({isHovering: true});

  handleMouseHoverOut = () => this.setState({isHovering: false});

  handleMenuOpen = e => this.setState({optionsAnchorEl: e.currentTarget});

  handleMenuClose = () => this.setState({optionsAnchorEl: null, isHovering: false});

  handleToEdit = () => this.setState({optionsAnchorEl: null, displayMode: false });

  onCategoryChange = e => this.setState({goalCategory: e.target.value});

  onTextChange = e => this.setState({goalText: e.target.value});

  handleSaveGoal = () => {
    this.props.actions.saveGoal({
      ...this.props.data,
      g: this.state.goalText,
      c: this.state.goalCategory
    });
    this.setState({displayMode: true})
  };

  handleToDelete = () => {
    this.props.actions.deleteGoal(this.props.data);
  }

  render() {
    return (
      <div className="gd-goal-item"
          onMouseEnter={this.handleMouseHoverIn}
          onMouseLeave={this.handleMouseHoverOut} >
        {this.state.displayMode ?

          //////////////////
          // DISPLAY MODE //
          //////////////////
            ([categoryIconDisplayMap(this.props.data.c, this.props.data.id),
            <div className="gd-goal-item__text" key={this.props.data.id+"text"}>
              {this.state.goalText}
            </div>,
            this.state.isHovering &&
              <IconButton
                  className="gd-goal-item__options-button"
                  onClick={this.handleMenuOpen}
                  key={this.props.data.id+"optionsIcon"}>
                <MoreVertIcon />
              </IconButton>,
            <Menu
              id="menu-goalitem"
              key={this.props.data.id+"menu"}
              anchorEl={this.state.optionsAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(this.state.optionsAnchorEl)}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.handleToEdit}>Edit</MenuItem>
              <MenuItem onClick={this.handleToDelete}>Delete</MenuItem>
              <MenuItem>Submit</MenuItem>
            </Menu>]) :

          ///////////////
          // EDIT MODE //
          ///////////////
            [
              <TextField
                select
                value={this.state.goalCategory}
                onChange={this.onCategoryChange}
                margin="normal"
                className="gd-goal-item__category-select"
                SelectProps={{
                  MenuProps: {
                    className: "timeline-category-select__menu",
                  },
                }}
                InputProps={{
                  classes: {
                    input: "gd-goal-item__category-input"
                  }
                }}
              >
                <MenuItem value="Other">
                  <ListItemIcon>
                    <svg width={24} height={24}/>
                  </ListItemIcon>
                  <ListItemText inset primary="Other" />
                </MenuItem>
                {Object.keys(CATEGORY_ICON_MAP).map(c => (
                  <MenuItem key={c} value={c}>
                    <ListItemIcon>
                      {CATEGORY_ICON_MAP[c]}
                    </ListItemIcon>
                    <ListItemText inset primary={c} />
                  </MenuItem>
                ))}
              </TextField>,
              <TextField 
                key={this.props.data.id+"textEditField"}
                className="gd-goal-item__text-edit-field"
                margin="normal"
                fullWidth
                onChange={this.onTextChange}
                value={this.state.goalText}/>,
              <IconButton
                  onClick={this.handleSaveGoal}
                  key={this.props.data.id+"saveGoalIcon"}>
                <CheckIcon />
              </IconButton>
            ]}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    goalDiscovery: state.goalDiscovery,
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
)(GoalItem);

function categoryIconDisplayMap(cat, id) {
  let map = {
    "Artistic": <PaletteIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Community": <VectorCircleIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Culinary": <FoodIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Education": <SchoolIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Family": <HomeIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Financial": <CurrencyUsdIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Fitness": <DumbbellIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Intellectual": <BookOpenIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Love/Romance": <HeartIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Medical": <HospitalIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Nature": <PineTreeIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Other": <svg height={24} width={24} className="gd-goal-item__icon" key={id+"icon"}/>,
    "Personal": <AccountIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Science": <AtomIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Social": <AccountGroupIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Spiritual": <CreationIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Travel": <EarthIcon className="gd-goal-item__icon" key={id+"icon"}/>,
    "Work/Career": <BriefcaseIcon className="gd-goal-item__icon" key={id+"icon"}/>,
  }
  return map[cat];
}

const CATEGORY_ICON_MAP = {
  "Artistic": <PaletteIcon/>,
  "Community": <VectorCircleIcon/>,
  "Culinary": <FoodIcon/>,
  "Education": <SchoolIcon/>,
  "Family": <HomeIcon/>,
  "Financial": <CurrencyUsdIcon/>,
  "Fitness": <DumbbellIcon/>,
  "Intellectual": <BookOpenIcon/>,
  "Love/Romance": <HeartIcon/>,
  "Medical": <HospitalIcon/>,
  "Nature": <PineTreeIcon/>,
  "Personal": <AccountIcon/>,
  "Science": <AtomIcon/>,
  "Social": <AccountGroupIcon/>,
  "Spiritual": <CreationIcon/>,
  "Travel": <EarthIcon/>,
  "Work/Career": <BriefcaseIcon/>,
}