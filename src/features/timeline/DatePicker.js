import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

/**
 * Fully Controlled Component - AddEventForm
 */
export default class DatePicker extends Component {

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
   * @param includeYearError {bool} Whether to calculate invalid date
   *  including invalid case (1). Used in rendered component since
   *  case (1) has separate error from cases (2) and (3). 
   */
  isInvalidDate = (y, m, d, includeYearError) => {
    let noYear = !y;
    let yearDecimal = y.includes(".");
    let dayNoMonth = !!(y && d && !m)
    let dayOutOfBounds =
      !!(y && d && m && (d > new Date(y, MONTHS.indexOf(m)+1, 0).getDate() || d < 1));
    let dayDecimal = d.includes(".");
    return includeYearError
      ? noYear || yearDecimal || dayNoMonth || dayOutOfBounds || dayDecimal
      : yearDecimal || dayNoMonth || dayOutOfBounds || dayDecimal;
  }

  handleMonthChange = e => {
    let d = this.props.day, m = e.target.value, y = this.props.year;
    let isValid = !this.isInvalidDate(y, m, d, true);
    this.props.onChange(m, d, y, isValid);
  }

  handleDayChange = e => {
    let d = e.target.value, m = this.props.month, y = this.props.year;
    let isValid = !this.isInvalidDate(y, m, d, true);
    this.props.onChange(m, d, y, isValid);
  }

  handleYearChange = e => {
    let d = this.props.day, m = this.props.month, y = e.target.value;
    let isValid = !this.isInvalidDate(y, m, d, true);
    this.props.onChange(m, d, y, isValid);
  }

  render() {
    let d = this.props.day;
    let m = this.props.month;
    let y = this.props.year;
    const hasNoYearError = y === "";
    const isInvalidDateWithYear = this.isInvalidDate(y, m, d, false);

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
                className: "timeline-date-picker__month-select-menu",
              },
            }}
          >
            <MenuItem key="none" value=""></MenuItem>
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
            onChange={this.handleDayChange}
            className="timeline-date-picker__field"
            type="number"
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
            onChange={this.handleYearChange}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            error={hasNoYearError}
            helperText={hasNoYearError ? "This field is required" : ""}
          />
        </div>

        <FormHelperText
          error={isInvalidDateWithYear}
          className={isInvalidDateWithYear ? "" : "timeline-date-picker__date-error--hidden"}>
          Please enter a valid date
        </FormHelperText>
      </FormControl>
    );
  }
}
