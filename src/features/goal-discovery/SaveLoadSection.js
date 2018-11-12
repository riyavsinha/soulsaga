import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GoalProto from 'proto/GoalProto';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import UploadButton from 'features/library/UploadButton';
import { DownloadIcon, UploadIcon } from 'mdi-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class SaveLoadSection extends Component {
  static propTypes = {
    goalDiscovery: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    snackbarOpen: false,
    uploadConfirmDialogOpen: false,
    stageGoals: null,
    writingGoals: false,
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
    var goals = 
      [
        ...this.props.goalDiscovery.experienceGoals.map(
            g => this.prepareGoalForDownload(g)),
        ...this.props.goalDiscovery.growthGoals.map(
            g => this.prepareGoalForDownload(g)),
        ...this.props.goalDiscovery.contributionGoals.map(
            g => this.prepareGoalForDownload(g)),
      ].filter(g => !!g.g),
    blob = new Blob([JSON.stringify(goals)], { type: 'application/json' }),
    anchor = document.createElement('a');

    anchor.download = "goals.json";
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':');
    anchor.click();
  }

  prepareGoalForDownload = g => {
    delete g.ref;
    return g;
  }

  readEvents = e => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        try {
          let goals = JSON.parse(reader.result);
          goals = goals.map(g => new GoalProto(g));
          this.setState({ stageGoals: goals });
          if (this.hasEvents()) {
            this.setState({ uploadConfirmDialogOpen: true});
          } else {
            this.commitEvents()
                .then(() => this.setState({ writingGoals: false }));
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
    if (this.state.stageGoals === null) {
      throw new Error("no goals to add")
    }
    const promises = [];
    this.state.stageGoals.forEach(g => {
      promises.push(this.props.actions.saveGoal(g));
    });
    this.setState({ stageGoals: null, writingGoals: true });
    return Promise.all(promises);
  }

  confirmOverwrite = () => {
    this.props.actions.deleteUserGoals()
      .then(() => this.commitEvents())
      .then(() => {
        this.handleDialogClose();
        this.setState({ writingGoals: false });
      });
  }

  renderLoadingCircle = () => {
    if (this.state.writingGoals) {
      return (
        <CircularProgress
            className="timeline-save-load-section__overwrite-progress" />);
    }
  }

  hasEvents = () => {
    return this.props.goalDiscovery.experienceGoals.length ||
        this.props.goalDiscovery.growthGoals.length ||
        this.props.goalDiscovery.contributionGoals.length;
  }

  render() {
    let disableDownload = !this.hasEvents();
    let topClass = this.props.className ? this.props.className : "";
    return (
      <div className={topClass}>
        <Button 
            variant="contained"
            color="primary"
            onClick={this.saveEvents}
            disabled={disableDownload}>
          Download
          <DownloadIcon className="timeline-save-load-section__icon"/>
        </Button>
        <UploadButton
            className="timeline-save-load-section__upload"
            onChange={this.readEvents}>
          Upload
          <UploadIcon className="timeline-save-load-section__icon"/>
        </UploadButton>

        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.snackbarOpen}
            autoHideDuration={2000}
            onClose={this.handleSnackbarClose}
            message={<span id="message-id">Please upload a valid goal file</span>}
          />

        <Dialog
            open={this.state.uploadConfirmDialogOpen}
            onClose={this.handleDialogClose}>
          <DialogTitle>
            Are you sure you would like to overwrite all your goals?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You already have goals loaded. Uploading a new set of goals
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
    goalDiscovery: state.goalDiscovery,
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
