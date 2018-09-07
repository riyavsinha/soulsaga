import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DownloadIcon, UploadIcon } from 'mdi-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class SaveLoadSection extends Component {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  // https://gist.github.com/liabru/11263260
  generateSaveUrl = () => {
    var events = this.props.timeline.events.map(e => {delete e.ref; return e;}),
    blob = new Blob([JSON.stringify(events)], { type: 'application/json' }),
    anchor = document.createElement('a');

    anchor.download = "events.json";
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':');
    anchor.click();
  }

  renderUpload() {
    if (!this.props.common.storeUserData) {
      return (
        <Button 
            variant="contained"
            color="primary"
            className="timeline-save-load-section__upload"
            onClick={this.generateSaveUrl}>
          Upload
          <UploadIcon className="timeline-save-load-section__icon"/>
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
            onClick={this.generateSaveUrl}
            disabled={disableDownload}>
          Download
          <DownloadIcon className="timeline-save-load-section__icon"/>
        </Button>
        {this.renderUpload()}
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
