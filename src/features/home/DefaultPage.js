import Button from '@material-ui/core/Button';
import EventProto from 'proto/EventProto';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimelineEvent from 'features/timeline/TimelineEvent';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { CloseIcon } from 'mdi-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = { showTermsPopup: true }

  generateTimelineInfoEvents = () => {
    let nullFn = () => "";
    const e = new EventProto({
      c: "Spiritual",
      t: "Visualize your life",
      de: `SoulSaga lets you build beautiful events to visualize
        your life, so you can remember and reflect on every step of your
        journey.`,
      m: "",
      y: "2018",
      ref: "asdf",
      d: "",
      i: "",
      id: "",
      ms: 0,
    });
    const f = new EventProto({
      c: "Security",
      t: "Your data is yours",
      de: `Each user has their own AES-128 encryption key, meaning no one but
        you sees your data. But, SoulSaga offers you the option to store your
        own data if you'd
        like. The only thing we'll remember is to remember nothing of yours :)`,
      m: "",
      y: "2018",
      ref: "asdf",
      d: "",
      i: "",
      id: "",
      ms: 0,
    });
    const g = new EventProto({
      c: "Love/Romance",
      t: "Built by thinkers, for thinkers",
      de: `Here at SoulSaga, we believe that understanding your personal
        past is the only way forward. We'll always be adding new tools
        to help you do so.`,
      m: "",
      y: "2018",
      ref: "asdf",
      d: "",
      i: "",
      id: "",
      ms: 0,
    });
    const h = new EventProto({
      c: "Personal",
      t: "Your mind only",
      de: `We're NOT a social platform. Your profile is a space for you to
        explore your own life. No ads, no sharing, just you.`,
      m: "",
      y: "2018",
      ref: "asdf",
      d: "",
      i: "",
      id: "",
      ms: 0,
    });
    return (
      <div className="landing-page__event_intro">
        <TimelineEvent event={e} onClick={nullFn} isDisplay={true} />
        <TimelineEvent event={f} onClick={nullFn} isDisplay={true} />
        <TimelineEvent event={g} onClick={nullFn} isDisplay={true} />
        <TimelineEvent event={h} onClick={nullFn} isDisplay={true} />
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

  closeTerms = () => this.setState({ showTermsPopup: false })

  TermsNotification = () => {
    if (!this.props.common.user && this.state.showTermsPopup) {
      return (
        <div className="landing-page__privacy-popup">
          <Typography className="landing-page__privacy-popup-text">
            By continuing to use this site, you agree to our <a href="/privacy">
            Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
          </Typography>
          <CloseIcon className="landing-page__privacy-popup-close-icon"
              onClick={this.closeTerms}/>
        </div>)
    }
    return null;
  }

  render() {
    return (
      <div className="home-default-page">
        <Typography variant="display4" align="center" className="landing-page__motto">
          Your space<br/>your story
        </Typography>
        {this.generateTimelineInfoEvents()}
        {this.renderTimelineButton()}
        <this.TermsNotification />
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
