import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SimpleSnackbar from 'features/library/SimpleSnackbar';
import * as actions from './redux/actions';

export class DataChangeSnackbars extends Component {
  static propTypes = {
    common: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  closeSuccess = () => this.props.actions.dataOperationSnackbarSucceeded(false);

  closeFailure = () => this.props.actions.dataOperationSnackbarFailed(false);

  render() {
    return (
      <div>
        <SimpleSnackbar
          open={this.props.common.dataSaveSuccessSnackbarOpen}
          onClose={this.closeSuccess}>
          Changes saved.
        </SimpleSnackbar>
        <SimpleSnackbar
          open={this.props.common.dataSaveFailureSnackbarOpen}
          onClose={this.closeFailure}>
          Changes failed to save. Please try again.
        </SimpleSnackbar>
      </div>
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
)(DataChangeSnackbars);
