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
  VectorCircleIcon} from 'mdi-react'
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

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
  "Security": <LockIcon/>,
  "Social": <AccountGroupIcon/>,
  "Spiritual": <CreationIcon/>,
  "Travel": <EarthIcon/>,
  "Work/Career": <BriefcaseIcon/>,
  "Other": "R",
}

export class TimelineEvent extends Component {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleEdit = () => {
    this.handleClose();
    this.props.actions.setEditingEvent(this.props.event);
    this.props.actions.toggleAddEventForm(true);
  }

  handleDelete = () => {
    this.handleClose();
    this.props.actions.deleteEvent(
      this.props.event.id,
      this.props.event.ref);
  }

  renderImg() {
    if (this.props.event.img) {
      return (
        <CardMedia
          className="timeline-timeline-event__media"
          image={this.props.event.img}/>);
    }
  }

  renderDesc() {
    if (this.props.event.desc) {
      return (
        <CardContent>
          <Typography component="p" className="timeline-timeline-event__desc">
            {this.props.event.desc}
          </Typography>
        </CardContent>);
    }
  }

  renderMenu() {
    return (
      <Menu
        id="simple-menu"
        anchorEl={this.state.anchorEl}
        open={Boolean(this.state.anchorEl)}
        onClose={this.handleClose}
      >
        <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
        <MenuItem onClick={this.handleDelete}>Delete</MenuItem>
      </Menu>
    );
  }

  render() {
    let dayString = this.props.event.day ? this.props.event.day + ", " : "";
    let yearString = parseInt(this.props.event.year, 10) < 0
      ? this.props.event.year.slice(1) + " BC"
      : this.props.event.year;
    let dateString = this.props.event.month + " " + dayString + yearString;
    return (
      <Card className="timeline-timeline-event__card">
        <CardHeader
          avatar={
            <Avatar className="timeline-timeline-event__avatar">
              {CATEGORY_ICON_MAP[this.props.event.category]}
            </Avatar>
          }
          action={
            <IconButton onClick={this.handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.event.title}
          subheader={dateString}
        />
        {this.renderImg()}
        {this.renderDesc()}
        {this.renderMenu()}
      </Card>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    timeline: state.timeline,
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
)(TimelineEvent);
