import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import TimelineEvent from './TimelineEvent';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
var _ = require('lodash');

const ResponsiveGridLayout = WidthProvider(Responsive);

export class TimelineDisplay extends Component {
  static propTypes = {
    timeline: PropTypes.object.isRequired,
  };

  getEvents = () => {
    let events = [...this.props.timeline.events];
    if (this.props.timeline.eventTagFilters.length > 0) {
      events = events.filter(e => {
        return (
          _.intersection(e.tg, this.props.timeline.eventTagFilters).length > 0
        );
      });
    }
    if (this.props.timeline.eventCategoryFilters.length > 0) {
      events = events.filter(e => {
        return this.props.timeline.eventCategoryFilters.includes(e.c);
      });
    }
    switch (this.props.timeline.eventOrdering) {
      case 'forward':
        return events.sort((x, y) => x.ms - y.ms);
      case 'reverse':
        return events.sort((x, y) => y.ms - x.ms);
      case 'year-reverse':
        events.sort((x, y) => x.ms - y.ms);
        let groups = [];
        let group = [];
        let curYear = events[0] ? events[0].y : null;
        events.forEach(e => {
          if (e.y === curYear) {
            group.push(e);
          } else {
            curYear = e.y;
            groups.push(group);
            group = [e];
          }
        });
        groups.push(group);
        return _.flatten(_.reverse(groups));
      default:
        throw new Error('unsupported chronological ordering');
    }
  };

  newYearEncountered = (year, layout, gridItems, yInd) => {
    let headerKey = year + 'gi';
    layout.push({ i: headerKey, x: 0, y: yInd, w: 1, h: 2, static: true });
    gridItems.push(
      <div key={headerKey} className="timeline-timeline-display__year-header">
        <Typography variant="display2">{year}</Typography>
      </div>,
    );
    yInd += 2;
    return yInd;
  };

  determineRowSize = e => {
    let numRows = 2;
    if (e.i !== '') {
      numRows += 3;
    }
    if (e.tg && e.tg.length) {
      numRows += 1;
    }
    if (e.de.length > 90) {
      numRows += 2;
    } else if (e.de.length > 0) {
      numRows += 1;
    }
    return numRows;
  };

  buildIndex = () => {
    // Items in grid display
    var gridItems = [];
    // Layout descriptors for each element in gridItems
    var layout = [];
    var mobileLayout = [];
    // Marker for current year
    var curYear = null;
    // Marker for current month
    var curMonth = null;
    // Index pointers for each column
    var yInd = 0;
    var mInd = 0;
    var dInd = 0;
    var mobileInd = 0;

    this.getEvents().forEach((event, ind) => {
      // Use ID as key
      let key = event.id.toString() + 'gi';
      // Boolean sum of present fields
      let col = parseInt((event.d !== '') + (event.m !== ''), 10);
      // Height of grid item according to content.
      let numRows = this.determineRowSize(event);
      // This item's layout descriptor
      let itemLayout = {};
      let itemMobileLayout = {};

      // MOBILE
      if (event.y !== curYear) {
        mobileLayout.push({
          i: event.y + 'gi',
          x: 0,
          y: mobileInd,
          w: 1,
          h: 2,
          static: true,
        });
        mobileInd += 2;
      }
      itemMobileLayout = {
        i: key,
        x: 0,
        y: mobileInd,
        w: 1,
        h: numRows,
        static: true,
      };
      mobileInd += numRows;
      // DESKTOP
      // Handle Year
      if (event.d === '' && event.m === '') {
        curMonth = null;
        // If in same year bloc, simply add on and increment columns
        if (event.y === curYear) {
          itemLayout = {
            i: key,
            x: col,
            y: yInd,
            w: 1,
            h: numRows,
            static: true,
          };
          yInd += numRows;
          // Otherwise reset year bloc and all indices to next bloc index
        } else {
          curYear = event.y;
          let next = this.newYearEncountered(
            event.y,
            layout,
            gridItems,
            Math.max(yInd, mInd, dInd),
          );
          itemLayout = {
            i: key,
            x: col,
            y: next,
            w: 1,
            h: numRows,
            static: true,
          };
          yInd = next + numRows;
          mInd = next;
          dInd = next;
        }
        // Handle Month
      } else if (event.d === '') {
        // If in different month bloc, fast-forward month/day indices
        if (event.m !== curMonth) {
          let nextMonthInd = Math.max(mInd, dInd);
          mInd = nextMonthInd;
          dInd = nextMonthInd;
        }
        // If same year add on, else reset year bloc and all indices
        if (event.y === curYear) {
          itemLayout = {
            i: key,
            x: col,
            y: mInd,
            w: 1,
            h: numRows,
            static: true,
          };
          mInd += numRows;
        } else {
          curYear = event.y;
          let next = this.newYearEncountered(
            event.y,
            layout,
            gridItems,
            Math.max(yInd, mInd, dInd),
          );
          itemLayout = {
            i: key,
            x: col,
            y: next,
            w: 1,
            h: numRows,
            static: true,
          };
          yInd = next;
          mInd = next + numRows;
          dInd = next;
        }
        curMonth = event.m;
        // Handle Day
      } else {
        if (event.m !== curMonth) {
          let nextMonthInd = Math.max(mInd, dInd);
          mInd = nextMonthInd;
          dInd = nextMonthInd;
        }
        if (event.y === curYear) {
          itemLayout = {
            i: key,
            x: col,
            y: dInd,
            w: 1,
            h: numRows,
            static: true,
          };
          dInd += numRows;
        } else {
          curYear = event.y;
          let next = this.newYearEncountered(
            event.y,
            layout,
            gridItems,
            Math.max(yInd, mInd, dInd),
          );
          itemLayout = {
            i: key,
            x: col,
            y: next,
            w: 1,
            h: numRows,
            static: true,
          };
          yInd = next;
          mInd = next;
          dInd = next + numRows;
        }
        curMonth = event.m;
      }
      mobileLayout.push(itemMobileLayout);
      layout.push(itemLayout);
      gridItems.push(
        <div key={key}>
          <TimelineEvent event={event} key={event.id} />
        </div>,
      );
    });
    return [layout, mobileLayout, gridItems];
  };

  render() {
    let [layout, mobileLayout, items] = this.buildIndex();
    return (
      <ResponsiveGridLayout
        breakpoints={{ normal: 950, condensed: 0 }}
        cols={{ normal: 3, condensed: 1 }}
        s
        rowHeight={45}
        layouts={{ normal: layout, condensed: mobileLayout }}
      >
        {items}
      </ResponsiveGridLayout>
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
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TimelineDisplay);
