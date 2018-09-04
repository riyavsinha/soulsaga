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

  buildIndex = () => {
    // {"2015": ["year" => 5, "January" => 4], "March" => 5]], "2016": ["February" => 6]}
    var dateIndex = {};
    var gridItems = [];
    var layout = []
    var yInd = 0;
    this.props.events.forEach((event, ind) => {
      let key = event.id.toString() + "gi";
      let col = parseInt((event.day !== "") + (event.month !== ""), 10);
      let itemLayout = {};
      // If day, only add to index if necessary and increment yInd
      if (event.day !== "") {
        if (!(event.year in dateIndex)) {
          let headerKey = event.year + "gi";
          layout.push({i: headerKey, x: 0, y: yInd, w:1, h:1, static: true});
          yInd++;
          gridItems.push(
            <div key={headerKey} className="timeline-timeline-display__year-header">
              <Typography variant="display1">
                {event.year}
              </Typography>
            </div>);
          dateIndex[event.year] = new Map();
          dateIndex[event.year].set("year", yInd);
        }
        if (!(dateIndex[event.year].has(event.month))) {
          dateIndex[event.year].set(event.month, yInd);
        }
        itemLayout = {i: key, x: col, y: yInd, w: 1, h: 1, static: true};
        yInd++;
      } else {
        // If month, check index first, otherwise add to index
        if (event.month !== "") {
          // Ensure year index initialized
          if (!(event.year in dateIndex)) {
            let headerKey = event.year + "gi";
            layout.push({i: headerKey, x: 0, y: yInd, w:1, h:1, static: true});
            yInd++;
            gridItems.push(
              <div key={headerKey} className="timeline-timeline-display__year-header">
                <Typography variant="display1">
                  {event.year}
                </Typography>
              </div>);
            dateIndex[event.year] = new Map();
            dateIndex[event.year].set("year", yInd);
          }
          let ind;
          // Check if in index
          if (dateIndex[event.year].has(event.month)) {
            ind = dateIndex[event.year].get(event.month);
            dateIndex[event.year].set(event.month, ind+1)
            if (ind+1 > yInd) {
              yInd++;
            }
          } else {
            ind = yInd;
            dateIndex[event.year].set(event.month, ind);
            yInd++;
          }
          itemLayout = {i: key, x: col, y: ind, w: 1, h: 1, static: true};
        } else {
          if (!(event.year in dateIndex)) {
            let headerKey = event.year + "gi";
            layout.push({i: headerKey, x: 0, y: yInd, w:1, h:1, static: true});
            yInd++;
            gridItems.push(
              <div key={headerKey} className="timeline-timeline-display__year-header">
                <Typography variant="display1">
                  {event.year}
                </Typography>
              </div>);
            dateIndex[event.year] = new Map();
            dateIndex[event.year].set("year", yInd);
          }
          let ind = dateIndex[event.year].get("year");
          dateIndex[event.year].set("year", ind+1);
          if (ind+1 > yInd) {
            yInd++;
          }
          itemLayout = {i: key, x: col, y: ind, w: 1, h: 1, static: true};        
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
      <ReactGridLayout cols={3} rowHeight={100} layout={layout}>
        {items}
      </ReactGridLayout>
    );
  }
}
