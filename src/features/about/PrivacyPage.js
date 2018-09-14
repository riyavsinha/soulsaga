import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class PrivacyPage extends Component {
  static propTypes = {
    about: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="about-privacy-page">
        <Typography variant="display1" className="about-about-page__d2">
          Privacy Policy
        </Typography>
        <Typography variant="title" className="about-about-page__t">
          Posted: September 14, 2018
        </Typography>
        <Typography className="about-about-page__p">
          SoulSaga ("Service") is a web application built by Riya Sinha. This
          site's services are provided at no cost and are intended
          for use as-is. This document explains
          what data my Service collects from you, and how we use it.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          What data we collect and Why
        </Typography>
        <Typography className="about-privacy-page__privacy-para">
          <i className="about-privacy-page__privacy-item">
            Consent
          </i><br/> 
          When you create an account with our Service, we will
          always record your initial data storage preference, along with
          any future changes you make to this option. We require this
          information, because it helps us determine whether to store
          any more of your data or not.
        </Typography>
        <Typography className="about-privacy-page__privacy-para">
          <i className="about-privacy-page__privacy-item">
            Social Media Information
          </i><br/> 
          When you sign in via Google, we use your name, email and
          profile photo for your SoulSaga profile, and for recording
          data consent.
        </Typography>
        <Typography className="about-privacy-page__privacy-para">
          <i className="about-privacy-page__privacy-item">
            Timeline Events
          </i><br/>
          If applicable, we collect data added via the Timeline feature
          for the purposes of storing your data for you in a secure
          and easily accessible manner across your devices.
        </Typography>
        <Typography className="about-privacy-page__privacy-para">
          <i className="about-privacy-page__privacy-item">
            Cookies
          </i><br/> 
          See the "Cookies" section below.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          How we use your data
        </Typography>
        <Typography className="about-about-page__p">
          You stored data is used by SoulSaga only for purposes of
          debugging the application for a better user experience, or
          in order to help deliver more relevant services for our
          users.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          With whom we share your data
        </Typography>
        <Typography className="about-about-page__p">
          SoulSaga does not share your data. However, we do
          use third-parties for authentication and data storage.
          Please consult the "Third-parties" section for more
          information.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Data Retention
        </Typography>
        <Typography className="about-about-page__p">
          We reserve the right to store any data you ask us to as long
          as your account is active. You reserve the right to clear
          your data or delete your account at any time. This can
          be done so from your Profile page.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Cookies
        </Typography>
        <Typography className="about-about-page__p">
          Cookies are small text files stored via your web browser. Cookies
          are commonly used as anonymous unique identifiers.
        </Typography>
        <Typography className="about-about-page__p">
          This Service does not use these “cookies” explicitly. However,
          the app may use third party code and libraries that use “cookies”
          to collect information and improve their services. You have the
          option to either accept or refuse these cookies and know when a
          cookie is being sent to your device. If you choose to refuse our
          cookies, you may not be able to use some portions of this Service.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Third-parties
        </Typography>
        <Typography className="about-about-page__p">
          We use Google Analytics to track site usage, in order to
          understand our user base and improve our services. Google Analytics
          does store cookies for visitors who are not signed in. If you have
          concerns about this, cookies can be disabled or deleted by your browser.
        </Typography>
        <Typography className="about-about-page__p">
          We use Firebase Database (by Google) in order to store your data.
          This provides secure storage and encryption for your data on servers
          and in transmission. You may opt out of this by choosing to
          store and be responsible for your own data.
        </Typography>
        <Typography className="about-about-page__p">
          We use Firebase Authentication (by Google) in order to provide a seamless
          sign-in experience and to obtain personal information for:
        </Typography>
        <ul>
          <li><Typography>Your SoulSaga profile</Typography></li>
          <li><Typography>Recording data consent</Typography></li>
          <li><Typography>
            Ensuring users are of age of consent in their respective
            countries
          </Typography></li>
        </ul>
        <Typography className="about-about-page__p">
          Firebase Authentication does store cookies on your browser as well,
          in order to allow sign-in state to persist across refreshes for a
          better user experience.
        </Typography>
        <Typography className="about-about-page__p">
          <a href="https://www.google.com/policies/privacy/partners/">
            How Google collects and processes your data
          </a>
        </Typography>
        <Typography className="about-about-page__p">
          <a href="https://policies.google.com/technologies/cookies">
            About Google and Cookies
          </a>
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Links to Other Sites
        </Typography>
        <Typography className="about-about-page__p">
          This Service may contain links to other sites. If you click
          on a third-party link, you will be directed to that site.
          Note that these external sites are not operated by me.
          Therefore, I strongly advise you to review the Privacy Policy
          of these websites. I have no control over and assume no
          responsibility for the content, privacy policies, or practices
          of any third-party sites or services.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Children’s Privacy
        </Typography>
        <Typography className="about-about-page__p">
          These Services do not address anyone under the age of consent
          in their respective country ("a child", "children"). I
          do not knowingly collect personally identifiable information
          from children without their parent's consent. In the case that
          I discover that a child has provided me with personal information,
          I immediately delete their account and any of their information
          from our servers. If you are a parent or guardian and you are
          aware that your child has provided us with personal information,
          please contact me so that I may perform any necessary
          actions.
        </Typography>
        
        <Typography variant="title" className="about-about-page__t">
          Changes to this Privacy Policy
        </Typography>
        <Typography className="about-about-page__p">
          We may update this policy to ensure continuous compliance
          with legal requirements. As our services change,
          this policy will be updated to reflect those changes as well.
        </Typography>
        <Typography className="about-about-page__p">
          If changes to policies regarding data you have already 
          consented to occur, prior notice will be given to you in order
          to manage your data before new policies take effect.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Contact Information
        </Typography>
        <Typography className="about-about-page__p">
          If you have questions, concerns or suggestions regarding
          our privacy policy, please do not hesitate to reach out.
        </Typography>
        <Typography className="about-about-page__p">
          Riya Sinha<br/>riya.sinha@soulsaga.org
        </Typography>

        <Typography className="about-privacy-page__footer">
          This privacy policy page was created at&nbsp;
          <a href="https://privacypolicytemplate.net">
            privacypolicytemplate.net
          </a>
          &nbsp;and modified/generated by&nbsp;
          <a href="https://app-privacy-policy-generator.firebaseapp.com/">
            App Privacy Policy Generator
          </a>
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
)(PrivacyPage);
