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

  CHRONO_STATES = {
    DEFAULT: "forward",
    REVERSE: "reverse",
  }

  // changeEventOrder = e => {
  //   let events = this.props.timeline.events;
  //   switch (e.target.value) {
  //     case this.CHRONO_STATES.REVERSE:
  //       events.sort((x, y) => y.ms - x.ms)
  //       break;
  //     case this.CHRONO_STATES.DEFAULT:
  //       events.sort((x, y) => x.ms - y.ms)
  //       break;
  //     default:
  //       throw new Error("unsupported chronological ordering");
  //   }
  //   this.setState({ordering: e.target.value});
  //   this.props.actions.populateEvents(events);
  // }

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
            <MenuItem value={this.CHRONO_STATES.DEFAULT}>Forward</MenuItem>
            <MenuItem value={this.CHRONO_STATES.REVERSE}>Reverse</MenuItem>
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
