import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

  state = {
    snackbarOpen: false,
    uploadConfirmDialogOpen: false,
    stageEvents: null,
    writingEvents: false,
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({snackbarOpen: false});
  };

  handleDialogClose = () => {
    this.setState({ uploadConfirmDialogOpen: false });
  }

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

  readEvents = e => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        try {
          let events = JSON.parse(reader.result);
          events = events.map(ev => new EventProto(ev));
          this.setState({ stageEvents: events });
          if (this.props.timeline.events.length > 0) {
            this.setState({ uploadConfirmDialogOpen: true});
          } else {
            this.commitEvents()
                .then(() => this.setState({ writingEvents: false }));
          }
        } catch (err) {
          console.log(err);
          this.setState({ snackbarOpen: true});
          return;
        }
      }, false);
    reader.readAsText(e.target.files[0]);
    e.target.value = null;
  }

  commitEvents = () => {
    if (this.state.stageEvents === null) {
      throw new Error("no events to add")
    }
    const promises = [];
    this.state.stageEvents.forEach(ev => {
      promises.push(this.props.actions.addEvent(ev));
    });
    this.setState({ stageEvents: null, writingEvents: true });
    return Promise.all(promises);
  }

  confirmOverwrite = () => {
    this.props.actions.deleteUserEvents()
      .then(() => this.commitEvents())
      .then(() => {
        this.handleDialogClose();
        this.setState({ writingEvents: false });
      });
  }

  renderLoadingCircle = () => {
    if (this.state.writingEvents) {
      return (
        <CircularProgress
            className="timeline-save-load-section__overwrite-progress" />);
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
        <Button
            variant="raised"
            component="label"
            color="primary"
            className="timeline-save-load-section__upload">
          Upload
          <UploadIcon className="timeline-save-load-section__icon"/>
          <input
              onChange={this.readEvents}
              style={{ display: 'none' }}
              type="file"
            />
        </Button>

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

        <Dialog
            open={this.state.uploadConfirmDialogOpen}
            onClose={this.handleDialogClose}>
          <DialogTitle>
            Are you sure you would like to overwrite all your events?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You already have events loaded. Uploading a new set of events
              will overwrite these permanently, including any events stored in
              the cloud. Are you sure you would like to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleDialogClose}>
              No
            </Button>
            <Button color="primary" onClick={this.confirmOverwrite}>
              Yes
            </Button>
          </DialogActions>
          {this.renderLoadingCircle()}
        </Dialog>
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
