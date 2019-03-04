import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { CATEGORY_ICON_MAP } from './eventiconmaps';
import { buildDateString } from './util';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

/**
 * The main card generated for each timeline event. 
 */
export class TimelineEvent extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    common: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    timeline: PropTypes.object.isRequired,
  };

  handleViewEvent = () => {
    this.props.actions.setViewingEvent(this.props.event);
  };

  render() {
    let dateString = buildDateString(
      this.props.event.d,
      this.props.event.m,
      this.props.event.y,
    );
    let titleClass =
      this.props.event.tg && this.props.event.tg.length
        ? 'timeline-timeline-event__header-container'
        : '';
    return (
      <Card
        className="timeline-timeline-event__card"
        onClick={this.props.onClick || this.handleViewEvent}
      >
        <CardHeader
          className={titleClass}
          avatar={
            <Avatar className="timeline-timeline-event__avatar">
              {this.props.event.c === 'Other'
                ? this.props.common.user.displayName.slice(0, 1).toUpperCase()
                : CATEGORY_ICON_MAP[this.props.event.c]}
            </Avatar>
          }
          title={this.props.event.t}
          subheader={dateString}
        />
        <EventTags event={this.props.event} />
        <EventImg img={this.props.event.i} />
        <EventDesc desc={this.props.event.de} />
      </Card>
    );
  }
}

/** EventTags functional component */
function EventTags({ event }) {
  if (!event.tg.length) {
    return null;
  }
  // Need to add padding on end if nothing else after tags
  let isEnd =
    !event.de && !event.i ? ' timeline-timeline-event__tag-container__end' : '';
  return (
    <div className={'timeline-timeline-event__tag-container' + isEnd}>
      {event.tg.map(t => (
        <Chip
          label={<div key={event.id + t + 'ChipLabel'}>{t}</div>}
          className="timeline-timeline-event__tag"
          key={event.id + t + 'Chip'}
        />
      ))}
    </div>
  );
}
EventTags.propTypes = { event: PropTypes.object.isRequired };

/** EventDesc functional component */
function EventDesc({ desc }) {
  return desc ? (
    <CardContent className="timeline-timeline-event__desc-container">
      <Typography component="p" className="timeline-timeline-event__desc">
        {desc}
      </Typography>
    </CardContent>
  ) : null;
}
EventDesc.propTypes = { desc: PropTypes.string };

/** EvengImg functional component */
function EventImg({ img }) {
  return img ? (
    <CardMedia className="timeline-timeline-event__media" image={img} />
  ) : null;
}
EventImg.propTypes = { img: PropTypes.string };

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    timeline: state.timeline,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimelineEvent);
