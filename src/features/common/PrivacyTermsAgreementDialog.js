import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimpleDialog from 'features/library/SimpleDialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { PRIVACY_CONSENT } from 'common/firebase';

export class PrivacyTermsAgreementDialog extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    open: true,
    titleText: "Please agree to SoulSaga policies",
    contentText: `In order to use SoulSaga's services,
      you must first consent to our <a href="/privacy">
      Privacy Policy</a> and <a href="/terms">Terms
      of Service</a>.`,
    negativeButton: "Cancel",
    positiveButton: "I Agree",
  }

  consentPrivacy = () => {
    this.props.actions.setUserDataConsent(
      this.props.common.user,
      PRIVACY_CONSENT,
      true,
      [ 
        this.state.titleText,
        this.state.contentText,
        this.state.negativeButton,
        this.state.positiveButton
      ]
    )
  }

  cancelAndSignOut = () => {
    this.props.actions.signOut(window.gapi);
  }

  render() {
    return (
      <SimpleDialog open={this.state.open}
            titleText={this.state.titleText}
            cancelButtonText="Cancel"
            cancelButtonAction={this.cancelAndSignOut}
            nextButtonText="I Agree"
            nextButtonAction={this.consentPrivacy}>
        In order to use SoulSaga's services,
        you must first consent to our <a href="/privacy">
        Privacy Policy</a> and <a href="/terms">Terms
        of Service</a>
      </SimpleDialog>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
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
)(PrivacyTermsAgreementDialog);
