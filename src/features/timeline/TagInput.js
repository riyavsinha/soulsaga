
import CancelIcon from "@material-ui/icons/Cancel";
import Chip from '@material-ui/core/Chip';
import Downshift from 'downshift';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import deburr from 'lodash/deburr';

export default class TagInput extends Component {
  static propTypes = {

  };

  state = { inputValue: "" }

  renderChipList = inputProps => {
    const { classes, selectedItem, onRemoveItem } = inputProps;
    return (
      <div className={classes.chipContainer}>
        {selectedItem.length > 0 &&
          selectedItem.map(item => (
            <Chip
              key={item}
              className={classes.chip}
              label={item}
              deleteIcon={<CancelIcon />}
              onDelete={() => onRemoveItem(item)}
              onClick={() => onRemoveItem(item)}
            />
          ))}
      </div>
    );
  };

  handleInputChange = e => {
    const input = e.target.value;
    if (input.slice(-1) === ",") {
      this.addTag(input.slice(0, input.length-1));
    } else {
      this.setState({inputValue: e.target.value});
    }
  }

  handleInputEnter = index => e => {
    if (index === null && e.key === 'Enter') {
      this.addTag(e.target.value);
    }
  }

  addTag = tag => {
    if (!this.props.eventTags.includes(tag) && tag.length !== 0) {
      this.props.eventTags.push(tag);
      this.props.onChange(this.props.eventTags);
    }
    this.setState({inputValue: ""});
  }

  handleChange = item => this.addTag(item)

  handleDelete = item => () => {
    const tags = this.props.eventTags;
    tags.splice(tags.indexOf(item), 1);
    this.props.onChange(tags);
  };

  getSuggestions = value => {
    const normalizeStr = s => deburr(s.trim()).toLowerCase();
    const inputValue = normalizeStr(value);
    // console.log(this.props.availableTags);

    return this.props.availableTags.filter(
      item => normalizeStr(item).includes(inputValue));
  }

  renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
      <MenuItem
        {...itemProps}
        key={suggestion+"Option"}
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
  // renderSuggestion.propTypes = {
  //   highlightedIndex: PropTypes.number,
  //   index: PropTypes.number,
  //   itemProps: PropTypes.object,
  //   selectedItem: PropTypes.string,
  //   suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
  // };

  render() {
    return (
      <div className="timeline-tag-input">
        <Downshift 
            onChange={this.handleChange}
            selectedItem={this.props.eventTags}
            inputValue={this.state.inputValue}>
          {({
            getInputProps,
            getItemProps,
            isOpen,
            toggleMenu,
            inputValue,
            selectedItem,
            highlightedIndex,
          }) => (
            <div>
              <div>
                {selectedItem.length > 0 &&
                  selectedItem.map(item => (
                    <Chip
                      key={item+"Chip"}
                      label={item}
                      onDelete={this.handleDelete(item)}
                    />
                  ))}
              </div>

              <TextField 
                value={inputValue}
                label="Tags"
                InputProps={getInputProps({
                  onChange: this.handleInputChange,
                  onKeyDown: this.handleInputEnter(highlightedIndex),
                  onClick: () => toggleMenu()
                })}/>
              
              {isOpen ? (
                <Paper square className="timeline-tag-input__autocomplete-menu">
                  {this.getSuggestions(inputValue).map((suggestion, index) =>
                    this.renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem: selectedItem,
                    }),
                  )}
                </Paper>
              ) : null}
            
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}
