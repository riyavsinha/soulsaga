import CancelIcon from '@material-ui/icons/Cancel';
import Chip from '@material-ui/core/Chip';
import Downshift from 'downshift';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import deburr from 'lodash/deburr';

export default class TagInput extends Component {
  static propTypes = {
    availableTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    eventTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  state = { inputValue: '' };

  /**
   * If comma entered, treats input as a completed tag and adds, otherwise
   * updates input state normally.
   *
   * @param {!Event} e 'change' event
   */
  handleInputChange = e => {
    const input = e.target.value;
    if (input.slice(-1) === ',') {
      this.addTag_(input.slice(0, input.length - 1));
    } else {
      this.setState({ inputValue: e.target.value });
    }
  };

  /**
   * Listens for 'Enter' key clicks, and adds current input as tag
   * if suggestion menu is not open, or there is no highlighted value
   * in the open menu.
   *
   * @param {boolean} isOpen Whether the menu is open
   * @param {?number} index The index of the selected item in the menu
   */
  handleInputEnter = (isOpen, index) => e => {
    if ((!isOpen || index === null) && e.key === 'Enter') {
      this.addTag_(e.target.value);
    }
  };

  /**
   * For non-empty tags not already added to the list, adds the tag
   * to the list and alerts parent using onChange. Also clears input
   * field.
   *
   * @param {string} tag
   * @private
   */
  addTag_ = tag => {
    if (!this.props.eventTags.includes(tag) && tag.length !== 0) {
      this.props.eventTags.push(tag);
      this.props.onChange(this.props.eventTags);
    }
    this.setState({ inputValue: '' });
  };

  /**
   * Handles changes initiated by Downshift, when a tag suggestion
   * is selected.
   *
   * @param {string} tag
   */
  handleChange = tag => this.addTag_(tag);

  /**
   * Handles deletion of an an added tag when 'x' is clicked in Chip.
   *
   * @param {string} item The tag item to delete
   */
  handleDelete = item => () => {
    const tags = this.props.eventTags;
    tags.splice(tags.indexOf(item), 1);
    this.props.onChange(tags);
  };

  /**
   * Generates suggestions for Downshift menu. Suggestion is applicable if
   * input value is a substring of the suggestion.
   *
   * Operates on normalized version of tags so tags with special characters
   * can still be found without having to re-enter them.
   *
   * @param {string} value The input value to find suggestions for.
   */
  getSuggestions = value => {
    const normalizeStr = s => deburr(s.trim()).toLowerCase();
    const inputValue = normalizeStr(value);

    return this.props.availableTags.filter(item =>
      normalizeStr(item).includes(inputValue),
    );
  };

  render() {
    let layoutClass =
      this.props.mode === 'side' ? 'timeline-tag-input__flex' : '';
    return (
      <div className="timeline-tag-input">
        <Downshift
          onChange={this.handleChange}
          selectedItem={this.props.eventTags}
          inputValue={this.state.inputValue}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            toggleMenu,
            inputValue,
            selectedItem,
            highlightedIndex,
          }) => (
            <div className={layoutClass}>
              <TagList
                selectedItems={selectedItem}
                onDelete={this.handleDelete}
              />

              <TextField
                value={inputValue}
                label="Tags"
                className="timeline-tag-input__text-field"
                InputProps={getInputProps({
                  onChange: this.handleInputChange,
                  onKeyDown: this.handleInputEnter(isOpen, highlightedIndex),
                  onClick: () => toggleMenu(),
                })}
              />

              <SuggestionMenu
                suggestions={this.getSuggestions(inputValue)}
                isOpen={isOpen}
                getItemProps={getItemProps}
                highlightedIndex={highlightedIndex}
                selectedItem={selectedItem}
              />
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

/** A list of tag chips */
function TagList({ selectedItems, onDelete }) {
  if (!selectedItems.length) {
    return null;
  }
  return (
    <div className="timeline-tag-input__tag-chip-section">
      {selectedItems.map(item => (
        <Chip
          key={item + 'Chip'}
          label={item}
          onDelete={onDelete(item)}
          className="timeline-tag-input__tag-chip"
        />
      ))}
    </div>
  );
}
TagList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

/** A tag suggestion menu item in Downshift */
function Suggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem.indexOf(suggestion.label) > -1;
  return (
    <MenuItem
      {...itemProps}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion}
    </MenuItem>
  );
}
Suggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.arrayOf(PropTypes.string).isRequired,
  suggestion: PropTypes.string.isRequired,
};

function SuggestionMenu({
  suggestions,
  isOpen,
  getItemProps,
  highlightedIndex,
  selectedItem,
}) {
  if (!isOpen || !suggestions.length) {
    return null;
  }
  return (
    <Paper square className="timeline-tag-input__autocomplete-menu">
      {suggestions.map((suggestion, index) => (
        <Suggestion
          key={suggestion + 'Option'}
          suggestion={suggestion}
          index={index}
          itemProps={getItemProps({ item: suggestion })}
          highlightedIndex={highlightedIndex}
          selectedItem={selectedItem}
        />
      ))}
    </Paper>
  );
}
SuggestionMenu.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  getItemProps: PropTypes.func.isRequired,
  highlightedIndex: PropTypes.number,
  selectedItem: PropTypes.arrayOf(PropTypes.string).isRequired
}