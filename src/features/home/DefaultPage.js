import Button from '@material-ui/core/Button';
import EventProto from 'proto/EventProto';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimelineEvent from 'features/timeline/TimelineEvent';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  generateTimelineInfoEvents = () => {
    const e = new EventProto({
      category: "Spiritual",
      title: "Visualize your life",
      desc: `SoulSaga lets you build beautiful events to visualize
        your life, so you can remember and reflect on every step of your
        journey.`,
      month: "",
      year: "2018",
      ref: "asdf",
    });
    const f = new EventProto({
      category: "Security",
      title: "Your data is yours",
      desc: `SoulSaga offers you the option to store your own data if you'd
        like. The only thing we'll remember is to remember nothing of yours :)`,
      month: "",
      year: "2018",
      ref: "asdf",
    });
    const g = new EventProto({
      category: "Love/Romance",
      title: "Built by thinkers, for thinkers",
      desc: `Here at SoulSaga, we believe that understanding your personal
        past is the only way forward. We'll always be adding new tools
        to help you do so.`,
      month: "",
      year: "2018",
      ref: "asdf",
    });
    const h = new EventProto({
      category: "Personal",
      title: "Your eyes only",
      desc: `We're NOT a social platform. Your profile is a space for you to
        explore your own life. No ads, no sharing, just you.`,
      month: "",
      year: "2018",
      ref: "asdf",
    });
    return (
      <div className="landing-page__event_intro">
        <TimelineEvent event={e} />
        <TimelineEvent event={f} />
        <TimelineEvent event={g} />
        <TimelineEvent event={h} />
      </div>
    );
  }

  renderTimelineButton = () => {
    if (this.props.common.user) {
      return (
        <div className="landing-page__timeline_button">
          <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/timeline">
            Go to my timeline
          </Button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="home-default-page">
        <Typography variant="display4" align="center" className="landing-page__motto">
          Your space<br/>your story
        </Typography>
        {this.generateTimelineInfoEvents()}
        {this.renderTimelineButton()}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);
