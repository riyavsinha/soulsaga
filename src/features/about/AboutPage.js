import Checkbox from '@material-ui/core/Checkbox';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class AboutPage extends Component {
  static propTypes = {
    about: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  RoadmapItem = props => {
    return (
      <div className="about-about-page__roadmap-item">
        <Checkbox disabled checked={props.checked === true} />
        <Typography>
          {props.children}
        </Typography>
      </div>)
  }

  render() {
    let RoadmapItem = this.RoadmapItem;
    return (
      <div className="about-about-page">
        <Typography variant="display1" className="about-about-page__d2">
          Empowering anyone to discover and reflect on their self
        </Typography>
        <Typography variant="title" className="about-about-page__t">
          Our Story
        </Typography>
        <Typography className="about-about-page__p">
          Soulsaga is currently run by a team of one (me), working on this as a
          hobby project.
        </Typography>
        <Typography className="about-about-page__p">
          For the past 2 years, I've kept a spreadsheet of all the
          significant events in my life, everything that helped me
          grow into the person I am today. Since then, I've also
          tried various other tools and techniques to reflect on my
          personal journey. I didn't have a way to unify all of these
          though, or a single place I could go to utilize these in
          synchrony.
        </Typography>
        <Typography className="about-about-page__p">
          For the Timeline especially, I didn't want it to be a
          normal timeline with events spaced out relative to
          time. I wanted it to feel natural, as if you were literally
          writing down your life on cards and arranging them on a wall
          or on the floor.
        </Typography>
        <Typography className="about-about-page__p">
          So here we are! It's a work in progress, but I hope many
          of you will resonate with my mission, and benefit from
          the tools I plan to provide here.
        </Typography>

        <Typography variant="display1" className="about-about-page__d2">
          FAQ
        </Typography>
        <Typography variant="title" className="about-about-page__t">
          Are there any plans to make this a social platform or
          enable sharing?
        </Typography>
        <Typography className="about-about-page__p">
          No, I believe there are enough platforms for that as is.
          I intend for this to remain as a place of solitude.
        </Typography>
        <Typography variant="title" className="about-about-page__t">
          What kind of events am I supposed to write about?
        </Typography>
        <Typography className="about-about-page__p">
          Whatever you want! I initially designed it to only be about
          events significant to personal growth, but anything you want
          to remember could be worth adding! (First time you watched
          Hamilton? Ate at a good restaurant? Anything goes!)
        </Typography>
        <Typography className="about-about-page__p">
          If you have any further categories you would like to see added,
          I'd love to hear it!
        </Typography>
        <Typography variant="title" className="about-about-page__t">
          Are there any plans to add other forms of sign-in?
        </Typography>
        <Typography className="about-about-page__p">
          Possibly, though unfortunately not at the moment, as I prefer
          building out new features to dealing with designing authentication
          pages and interactions.
        </Typography>
        <Typography variant="title" className="about-about-page__t">
          I'd like to know more about your tech stack. What technologies
          do you use?
        </Typography>
        <Typography className="about-about-page__p">
          Great question! We use <a href="https://reactjs.org/">React.js</a>
          &nbsp;on the frontend, with <a href="https://material-ui.com/">
          Material UI</a> as our UI library. We use&nbsp;
          <a href="https://firebase.google.com/products/auth/">
          Firebase Authentication</a> for user sign-up/sign-in, and
          finally <a href="https://firebase.google.com/products/realtime-database/">
          Firebase Database</a> for reliable storage. A shoutout
          goes to <a href="https://materialdesignicons.com/">Material
          Design Icons</a> as well, for providing a very comprehensive
          set of icons for the various Timeline categories we wanted
          to represent.
        </Typography>
        <Typography variant="title" className="about-about-page__t">
          Why do you require access to my Google Drive?
        </Typography>
        <Typography className="about-about-page__p">
          <b> The app does not request access to any of your personal files.
          The app simply requires the ability to create a hidden folder
          in your Drive for your personal encryption key (just a few bytes) </b>&nbsp;
          Every SoulSaga user has their own AES-128 encryption key,
          which we store in a hidden
          folder of your Google Drive. The key, and therefore your data,
          is then inaccessible to anyone
          who hacks our admin account (and even to the admins themselves),
          meaning your data remains secure because YOU
          will always be in sole possession of it. Since the
          key storage is cloud-based, you can access your stored data from
          any device. Also, because each user has their own key,
          no one person's data security is dependent on other users!
        </Typography>
        <Typography className="about-about-page__p">
          <b> WARNING: Clearing your data from SoulSaga in your Google Drive
          will cause your data to be irrecoverable </b>
        </Typography>

        <Typography variant="display1" className="about-about-page__d2">
          Roadmap
        </Typography>
        <Typography className="about-about-page__p">
          The following is a list of features I plan to add. These are subject
          to change, as well as the order in which these are addressed.
        </Typography>
        <RoadmapItem>
          [Minor] Add tags for events
        </RoadmapItem>
        <RoadmapItem>
          [Minor] Add event filtering by category and tags
        </RoadmapItem>
        <RoadmapItem>
          [Major] Add 'Views' tool for people to record and track their
          views on various subjects and topics over time
        </RoadmapItem>
        <RoadmapItem>
          . . . and more!
        </RoadmapItem>
        <Typography className="about-about-page__p">
          If you have other tools you'd like to see, please let me know!
        </Typography>

        <Typography variant="display1" className="about-about-page__d2">
          Contact us
        </Typography>
        <Typography className="about-about-page__p">
          I'd love to hear from you about any questions, feedback, feature requests,
          or general thoughts you might have! You can reach me at
          riya.sinha@soulsaga.org
        </Typography>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    about: state.about,
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
)(AboutPage);
