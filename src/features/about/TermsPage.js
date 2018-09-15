import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TermsPage extends Component {
  static propTypes = {
    about: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="about-terms-page">
         <Typography variant="display1" className="about-about-page__d2">
          Terms of Service
        </Typography>
        <Typography variant="title" className="about-about-page__t">
          Posted: September 15, 2018
        </Typography>
        <Typography className="about-about-page__p">
          Thank you for using SoulSaga! These Terms of Service ("Terms") are a
          contract between you and SoulSaga, and outlines your
          responsibilities while using this website, product and content ("Services").
        </Typography>
        <Typography className="about-about-page__p">
          By using SoulSaga, you agree to these Terms, as well as our&nbsp;
          <a href="privacy">Privacy Policy</a>. A&nbsp;
          <a href="https://github.com/riyavsinha/soulsaga-policy">historical record</a>
          &nbsp;of changes to our policies is stored on GitHub. We reserve the right
          to change these policies at any time. If a change is material, you will be
          given prior notice. If you do not agree to a new Terms, you have will
          have the chance to delete your account and data. Otherwise, your use
          of this site and content will be subject to the new Terms.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          User Responsibilities
        </Typography>
        <Typography className="about-about-page__p">
          You may not do, or try to do, the following: (1) access or tamper
          with non-public areas of the Services, our computer systems, or
          the systems of our technical providers; (2) access or search the
          Services by any means other than the currently available, published
          interfaces (e.g., APIs) that we provide; (3) forge any TCP/IP packet
          header or any part of the header information in any email or posting,
          or in any way use the Services to send altered, deceptive, or
          false source-identifying information; or (4) interfere with, or
          disrupt, the access of any user, host, or network, including sending
          a virus, overloading, flooding, spamming, mail-bombing the Services,
          or by scripting the creation of content or accounts in such a manner
          as to interfere with or create an undue burden on the Services.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Security
        </Typography>
        <Typography className="about-about-page__p">
          If you discover a security vulnerability while using our Service,
          please inform us as soon as possible.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Rules and policies
        </Typography>
        <Typography className="about-about-page__p">
          By using the Services, you agree to let SoulSaga collect and use
          information as detailed in our&nbsp;
          <a href="/privacy">Privacy Policy</a>. If you’re outside
          the United States, you consent to letting SoulSaga transfer, store,
          and process your information (including your personal information
          and content) in and out of the United States.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Disclaimer of warranty
        </Typography>
        <Typography className="about-about-page__p">
          SoulSaga provides the Services to you as is. You use them at
          your own risk and discretion. That means they don’t come with
          any warranty. None express, none implied. No implied warranty
          of merchantability, fitness for a particular purpose,
          availability, security, title or non-infringement.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Limitation of Liability
        </Typography>
        <Typography className="about-about-page__p">
          SoulSaga won’t be liable to you for any damages that arise from your
          using the Services. This includes if the Services are hacked or
          unavailable. This includes all types of damages (indirect,
          incidental, consequential, special or exemplary). And it includes
          all kinds of legal claims, such as breach of contract, breach of
          warranty, tort, or any other loss.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          No waiver
        </Typography>
        <Typography className="about-about-page__p">
          If SoulSaga doesn’t exercise a particular right under these Terms,
          that doesn’t waive it.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Severability
        </Typography>
        <Typography className="about-about-page__p">
          If any provision of these terms is found invalid by a court of
          competent jurisdiction, you agree that the court should try to
          give effect to the parties’ intentions as reflected in the provision
          and that other provisions of the Terms will remain in full effect.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Choice of law and jurisdiction
        </Typography>
        <Typography className="about-about-page__p">
          These Terms are governed by California law, without reference to its
          conflict of laws provisions. You agree that any suit arising from
          the Services must take place in a court located in San Francisco,
          California.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Entire agreement
        </Typography>
        <Typography className="about-about-page__p">
          These Terms (including any document incorporated by reference into
          them) are the whole agreement between SoulSaga and you concerning
          the Services.
        </Typography>

        <Typography variant="title" className="about-about-page__t">
          Contact Information
        </Typography>
        <Typography className="about-about-page__p">
          If you have questions, concerns or suggestions regarding
          our Terms, please do not hesitate to reach out.
        </Typography>
        <Typography className="about-about-page__p">
          Riya Sinha<br/>riya.sinha@soulsaga.org
        </Typography>

        <Typography className="about-privacy-page__footer">
          This Terms of Service was created with the help of the&nbsp;
          <a href="https://medium.com/policy/medium-terms-of-service-9db0094a1e0f">
            Medium</a> Terms of Service.
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
)(TermsPage);
