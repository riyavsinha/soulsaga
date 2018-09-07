import Button from '@material-ui/core/Button';
import EventProto from 'proto/EventProto';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { DownloadIcon, UploadIcon } from 'mdi-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class SaveLoadSection extends Component {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = { snackbarOpen: false };

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({snackbarOpen: false});
  };

  // https://gist.github.com/liabru/11263260
  saveEvents = () => {
    var events = this.props.timeline.events.map(e => {delete e.ref; return e;}),
    blob = new Blob([JSON.stringify(events)], { type: 'application/json' }),
    anchor = document.createElement('a');

    anchor.download = "events.json";
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':');
    anchor.click();
  }

  uploadEvents = e => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        try {
          let events = JSON.parse(reader.result);
          events = events.map(ev => new EventProto(ev));
          this.props.actions.populateEvents(events);
        } catch (e) {
          console.log(e);
          this.setState({ snackbarOpen: true});
          return;
        }
      }, false);
    reader.readAsText(e.target.files[0]);
  }

  renderUpload() {
    if (!this.props.common.storeUserData) {
      return (
        <Button
            variant="raised"
            component="label"
            color="primary"
            className="timeline-save-load-section__upload">
          Upload
          <UploadIcon className="timeline-save-load-section__icon"/>
          <input
              onChange={this.uploadEvents}
              style={{ display: 'none' }}
              type="file"
            />
        </Button>
      );
    }
  }

  render() {
    let disableDownload = this.props.timeline.events.length === 0;
    return (
      <div>
        <Button 
            variant="contained"
            color="primary"
            onClick={this.saveEvents}
            disabled={disableDownload}>
          Download
          <DownloadIcon className="timeline-save-load-section__icon"/>
        </Button>
        {this.renderUpload()}

        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snackbarOpen}
            autoHideDuration={2000}
            onClose={this.handleSnackbarClose}
            message={<span id="message-id">Please upload a valid event file</span>}
          />
      </div>
    );
  }
}

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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveLoadSection);
