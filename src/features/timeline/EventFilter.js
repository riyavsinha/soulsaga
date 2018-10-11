import CategorySelect from './CategorySelect';
import Chip from '@material-ui/core/Chip';
import React, { Component } from 'react';
import Panel from 'features/library/Panel';
import PropTypes from 'prop-types';
import TagInput from './TagInput';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class EventFilter extends Component {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  
  onTagChange = e => this.props.actions.setEventTagFilters(e);

  handleAddCategory = e => {
    let c = e.target.value;
    if (!this.props.timeline.eventCategoryFilters.includes(c)) {
      this.props.timeline.eventCategoryFilters.push(c)
      this.props.actions.setEventCategoryFilters(this.props.timeline.eventCategoryFilters);
    }
  }

  handleDeleteCategory = item => () => {
    const tags = this.props.timeline.eventCategoryFilters;
    tags.splice(tags.indexOf(item), 1);
    this.props.actions.setEventCategoryFilters(tags);
  };

  render() {
    return (
      <Panel title="Filter">
        <div className="timeline-event-filter__category-section" >
          <CategorySelect category="" onChange={this.handleAddCategory} />
          <div className="timeline-tag-input__tag-chip-section">
            {this.props.timeline.eventCategoryFilters.map(item => (
                <Chip
                  key={item+"Chip"}
                  label={item}
                  onDelete={this.handleDeleteCategory(item)}
                  className="timeline-tag-input__tag-chip"
                />
              ))}
          </div>
        </div>
        <TagInput 
            eventTags={this.props.timeline.eventTagFilters}
            availableTags={[]}
            onChange={this.onTagChange}
            mode="side"/>
      </Panel>
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
)(EventFilter);
