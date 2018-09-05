import React, { Component } from 'react';
import RGL, { WidthProvider } from "react-grid-layout";
import TimelineEvent from './TimelineEvent';
import Typography from '@material-ui/core/Typography';
import 'react-grid-layout/css/styles.css' 
import 'react-resizable/css/styles.css' 

const ReactGridLayout = WidthProvider(RGL);

export default class TimelineDisplay extends Component {
  static propTypes = {

  };

  state = {
    dayEvents: [],
    monthEvents: [],
    yearEvents: [],
    yearIndex: {},
    monthIndex: {},
  }

  newYearEncountered = (year, layout, gridItems, dateIndex, yInd) => {
    let headerKey = year + "gi";
    layout.push({i: headerKey, x: 0, y: yInd, w:1, h:2, static: true});
    gridItems.push(
      <div key={headerKey} className="timeline-timeline-display__year-header">
        <Typography variant="display2">
          {year}
        </Typography>
      </div>);
    yInd += 2;
    dateIndex[year] = new Map();
    dateIndex[year].set("year", yInd);
    return yInd;
  }

  buildIndex = () => {
    console.log(this.props.events);
    // {"2015": ["year" => 5, "January" => 4], "March" => 5]], "2016": ["February" => 6]}
    var dateIndex = {};
    var gridItems = [];
    var layout = []
    var yInd = 0;
    this.props.events.forEach((event, ind) => {
      let key = event.id.toString() + "gi";
      let col = parseInt((event.day !== "") + (event.month !== ""), 10);
      let numRows = 2;
      if (event.img !== "") { numRows += 3 }
      if (event.desc.length > 90) { numRows += 2 } else if (event.desc.length > 0) { numRows += 1 }
      let itemLayout = {};
      // If day, only add to index if necessary and increment yInd
      if (event.day !== "") {
        if (!(event.year in dateIndex)) {
          yInd = this.newYearEncountered(event.year, layout, gridItems, dateIndex, yInd);
        }
        if (!(dateIndex[event.year].has(event.month))) {
          dateIndex[event.year].set(event.month, yInd);
        }
        itemLayout = {i: key, x: col, y: yInd, w: 1, h: numRows, static: true};
        yInd += numRows;
      } else {
        // If month, check index first, otherwise add to index
        if (event.month !== "") {
          // Ensure year index initialized
          if (!(event.year in dateIndex)) {
            yInd = this.newYearEncountered(event.year, layout, gridItems, dateIndex, yInd);
          }
          let ind;
          let next;
          // Check if in index
          if (dateIndex[event.year].has(event.month)) {
            ind = dateIndex[event.year].get(event.month);
            next = ind + numRows;
            dateIndex[event.year].set(event.month, next)
            if (next > yInd) {
              yInd = next;
            }
          } else {
            ind = yInd;
            dateIndex[event.year].set(event.month, ind+numRows);
            yInd += numRows;
          }
          itemLayout = {i: key, x: col, y: ind, w: 1, h: numRows, static: true};
        } else {
          if (!(event.year in dateIndex)) {
            yInd = this.newYearEncountered(event.year, layout, gridItems, dateIndex, yInd);
          }
          let ind = dateIndex[event.year].get("year");
          let next = ind + numRows;
          dateIndex[event.year].set("year", next);
          if (next > yInd) {
            yInd = next;
          }
          itemLayout = {i: key, x: col, y: ind, w: 1, h: numRows, static: true};        
        }
      }
      layout.push(itemLayout);
      gridItems.push(
        <div key={key}>
          <TimelineEvent event={event} key={event.id} />
        </div>);
    })
    return [layout, gridItems];
  }

  render() {
    let info = this.buildIndex();
    let layout = info[0], items = info[1];
    return (
      <ReactGridLayout cols={3} rowHeight={45} layout={layout}>
        {items}
      </ReactGridLayout>
    );
  }
}
