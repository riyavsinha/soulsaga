import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { PRIMARY_CATEGORIES, SECONDARY_CATEGORIES } from './eventiconmaps';

export default function CategorySelect({category, onChange}) {
  return (
    <TextField
      select
      label="Category"
      value={category}
      onChange={onChange}
      className="timeline-category-select__field"
      margin="normal"
      SelectProps={{
        MenuProps: {
          className: 'timeline-category-select__menu',
        },
      }}
      InputProps={{
        classes: {
          input: 'timeline-category-select__input',
        },
      }}
    >
      <MenuItem value="Other">
        <em>Other</em>
      </MenuItem>
      <Divider />
      {Object.keys(PRIMARY_CATEGORIES).map(c => (
        <MenuItem key={c} value={c}>
          <ListItemIcon>{PRIMARY_CATEGORIES[c]}</ListItemIcon>
          <ListItemText inset primary={c} />
        </MenuItem>
      ))}
      <Divider />
      {Object.keys(SECONDARY_CATEGORIES).map(c => (
        <MenuItem key={c} value={c}>
          <ListItemIcon>{SECONDARY_CATEGORIES[c]}</ListItemIcon>
          <ListItemText inset primary={c} />
        </MenuItem>
      ))}
    </TextField>
  );
};

CategorySelect.propTypes = {
  category: PropTypes.oneOf(
    Object.keys(PRIMARY_CATEGORIES)
      .concat(Object.keys(SECONDARY_CATEGORIES))
      .concat(['Other', '']),
  ),
  onChange: PropTypes.func.isRequired,
};