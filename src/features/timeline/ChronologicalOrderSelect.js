import MenuItem from '@material-ui/core/MenuItem';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class ChronologicalOrderSelect extends Component {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  changeOrder = e => this.props.actions.setChronoOrder(e.target.value);

  render() {
    return (
        <TextField
            select
            label="Chronological Order"
            value={this.props.timeline.eventOrdering}
            onChange={this.changeOrder}
            className="timeline-chronological-order-select"
            margin="normal"
          >
            <MenuItem value="forward">Forward</MenuItem>
            <MenuItem value="reverse">Reverse</MenuItem>
          </TextField>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
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
)(ChronologicalOrderSelect);
