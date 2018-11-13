import GoalItem from './GoalItem';
import GoalProto from 'proto/GoalProto';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { PlusIcon } from 'mdi-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class GoalColumn extends Component {
  static propTypes = {
    goalDiscovery: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleAddItem = () => {
    let g = new GoalProto(null, this.props.type);
    g.id = Date.now();
    this.props.actions.addGoal(g);
  }; 

  render() {
    return (
      <div className="gd-goal-column">
        <div className="gd-goal-column__wrapper">
          <div className="gd-goal-column__title-section">
            <Typography variant="headline">
              {this.props.title}
            </Typography>
            <Typography variant="subheading"
                className="gd-goal-column__subtitle">
              {this.props.subtitle}
            </Typography>
          </div>
          {this.props.data.map(g => 
            <GoalItem data={g} displayMode={!!g.g} key={g.id+"k"}/>
          )}
          <Button 
              className="gd-goal-column__add-item-button"
              variant="outlined"
              color="primary"
              onClick={this.handleAddItem}>
            <PlusIcon className="gd-goal-column__add-item-plus-icon"/>
            Add Goal
          </Button>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
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
)(GoalColumn);
