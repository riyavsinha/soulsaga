import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Fully Controlled Component - AddEventForm
 */
export default class DatePicker extends Component {
  static propTypes = {
    day: PropTypes.string.isRequired,
    month: PropTypes.oneOf(MONTHS.concat('')).isRequired,
    year: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  /**
   * Determines whether a day/month/year date is invalid.
   *
   * Valid dates are either just a year, a year with a month, or a year with
   * month and day.
   *
   * An invalid date is therefore determined in one of 3 ways:
   *  (1) No year
   *  (2) A year with a day but no month
   *  (3) A year with a month and day, but day is invalid for given month/year
   *
   * @param y {!String} The date's year
   * @param m {!String} The date's month
   * @param d {!String} The date's day
   * @param includeYearError {bool=} Whether to calculate invalid date
   *  including invalid case (1). Used in rendered component since
   *  case (1) has separate error from cases (2) and (3).
   */
  isInvalidDate = (y, m, d, includeYearError = true) => {
    const numericReg = new RegExp('^\\d*$');
    const noYear = !y;
    const nonNumericYear = !numericReg.test(y);
    const dayWithoutMonth = !!(y && d && !m);
    const dayOutOfBounds = !!(
      y &&
      d &&
      m &&
      (d > new Date(y, MONTHS.indexOf(m) + 1, 0).getDate() || d < 1)
    );
    const nonNumericDay = !numericReg.test(d);
    const invalidWithoutYearError =
      nonNumericYear || dayWithoutMonth || dayOutOfBounds || nonNumericDay;
    return includeYearError
      ? noYear || invalidWithoutYearError
      : invalidWithoutYearError;
  };

  blockNonNumericKeys = e => {
    if (['+', '.', '-', 'e'].includes(e.key)) {
      e.preventDefault();
    }
  };

  handleDateChange = (d, m, y) =>
    this.props.onChange(m, d, y, !this.isInvalidDate(y, m, d, true));

  handleMonthChange = e =>
    this.handleDateChange(this.props.day, e.target.value, this.props.year);

  handleDayChange = e =>
    this.handleDateChange(e.target.value, this.props.month, this.props.year);

  handleYearChange = e =>
    this.handleDateChange(this.props.day, this.props.month, e.target.value);

  render() {
    // Shorthand props
    const d = this.props.day;
    const m = this.props.month;
    const y = this.props.year;
    // Determine errors
    const hasNoYearError = !y;
    const isInvalidDateWithYear =
      this.isInvalidDate(y, m, d, false) && !hasNoYearError;

    return (
      <FormControl>
        <div>
          {/** Month Select */}
          <TextField
            select
            label="Month"
            value={m}
            onChange={this.handleMonthChange}
            className="timeline-date-picker__month timeline-date-picker__field"
            margin="normal"
            SelectProps={{
              MenuProps: {
                className: 'timeline-date-picker__month-select-menu',
              },
            }}
          >
            <MenuItem key="none" value="" />
            {MONTHS.map(month => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </TextField>

          {/** Day Number Input */}
          <TextField
            label="Day"
            value={d}
            type="number"
            onChange={this.handleDayChange}
            inputProps={{ onKeyDown: this.blockNonNumericKeys }}
            className="timeline-date-picker__field"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />

          {/** Year Number Input */}
          <TextField
            required
            label="Year"
            value={y}
            type="number"
            onChange={this.handleYearChange}
            inputProps={{ onKeyDown: this.blockNonNumericKeys }}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            error={hasNoYearError}
            helperText={hasNoYearError ? 'This field is required' : ''}
          />
        </div>

        <FormHelperText
          error={isInvalidDateWithYear}
          className={
            isInvalidDateWithYear
              ? ''
              : 'timeline-date-picker__date-error--hidden'
          }
        >
          Please enter a valid date
        </FormHelperText>
      </FormControl>
    );
  }
}
