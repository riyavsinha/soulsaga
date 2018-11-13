import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {
  TIMELINE_CONSENT,
  GENERIC_DATA_CONSENT,
  GOALS_CONSENT
} from 'common/firebase';

export class GeneralStorageSettingsDialog extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    open: true,
    value: "",
    dataSettingDialogTitle: "Select your data settings",
    dataSettingDialogContentText: `Welcome to SoulSaga! Before you begin,
      please select whether you would like us to store your data, or whether
      you would like to be responsible for and manage your own data.`,
    dataSettingDialogContentText2: `This will serve as your initial
      setting for all tools, and your default
      setting for when new tools are added to SoulSaga. 
      You can change this option, and options for individual tools
      from your Profile page.`,
    saveDataRadioLabel: `Save my data for me. I understand I can change
      this setting at any time from my Profile page.`,
    noSaveRadioLabel: `I'll save my own data. I understand I am
      responsible for saving and storing any data I create here, and that
      in order to use this application, I must provide the data file each time.`,
    dataSettingDialogButtonText: "Save",
  }

  handleClose = async () => {
    let consents = [
      GENERIC_DATA_CONSENT,
      TIMELINE_CONSENT,
      GOALS_CONSENT
    ];
    let saveConsentPromises = consents.map(consentType =>
      this.props.actions.setUserDataConsent(
        this.props.common.user,
        consentType,
        this.state.value === "true",
        [
          this.state.dataSettingDialogTitle,
          this.state.dataSettingDialogContentText,
          this.state.saveDataRadioLabel,
          this.state.noSaveRadioLabel,
          this.state.dataSettingDialogButtonText,
        ]
      ));
    let promises = await saveConsentPromises;
    console.log(promises);
    this.setState({ open: false });
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <Dialog open={this.state.open}>
        <DialogTitle>{this.state.dataSettingDialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText className="data-setting-dialog__content-text">
            {this.state.dataSettingDialogContentText}
          </DialogContentText>
          <DialogContentText className="data-setting-dialog__content-text">
            {this.state.dataSettingDialogContentText2}
          </DialogContentText>
          <FormControl component="fieldset">
            <RadioGroup
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel value="true" control={<Radio />} 
                label={this.state.saveDataRadioLabel}
                className="data-setting-dialog__radio-option"/>
              <FormControlLabel value="false" control={<Radio />}
                label={this.state.noSaveRadioLabel} />
            </RadioGroup>
          </FormControl>  
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary" disabled={this.state.value === ""}>
            {this.state.dataSettingDialogButtonText}
          </Button>
        </DialogActions>
      </Dialog>
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
)(GeneralStorageSettingsDialog);
