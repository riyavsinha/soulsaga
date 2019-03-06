import EventProto from 'proto/EventProto';
import React from 'react';
import { buildDateTime } from 'features/timeline/util';
import { shallow } from 'enzyme';
import { TimelineDisplay } from 'features/timeline/TimelineDisplay';
import _ from 'lodash';

// Enum for describing events with different features affecting layout
const EventFeatures = {
  LONG_DESC: 'LongDesc',
  DESC: 'Desc',
  IMG: 'Img',
  TG: 'Tg',
};

let id = 1;

describe('timeline/TimelineDisplay', () => {
  let props;

  beforeEach(() => {
    props = {
      timeline: {
        eventCategoryFilters: [],
        eventOrdering: 'forward',
        eventTagFilters: [],
        events: [],
      },
    };
  });

  describe('renders', () => {
    it('with empty events list', () => {
      const wrapper = shallow(<TimelineDisplay {...props} />);

      expect(wrapper.children()).toHaveLength(0);
    });

    it('year header and event for single event', () => {
      props.timeline.events = [buildEvent(2012, 'March', 2)];
      const wrapper = shallow(<TimelineDisplay {...props} />);

      expect(wrapper.children()).toHaveLength(2);
    });

    it('multiple events of same year under same year header', () => {
      props.timeline.events = [
        buildEvent(2012, 'May', 3),
        buildEvent(2012, 'May', 2),
        buildEvent(2013, 'May', 3),
        buildEvent(2013, 'May', 2),
      ];
      const wrapper = shallow(<TimelineDisplay {...props} />);

      expect(wrapper.children()).toHaveLength(6);
    });
  });

  describe('places events in proper columns', () => {
    it('[Desktop] event with just year in first column', () => {
      props.timeline.events = [buildEvent(2012)];
      const wrapper = shallow(<TimelineDisplay {...props} />);

      expect(wrapper.props().layouts.normal[1].x).toBe(0);
    });

    it('[Desktop] event with year and month in second column', () => {
      props.timeline.events = [buildEvent(2012, 'March')];
      const wrapper = shallow(<TimelineDisplay {...props} />);

      expect(wrapper.props().layouts.normal[1].x).toBe(1);
    });

    it('[Desktop] event with year,month,day in third column', () => {
      props.timeline.events = [buildEvent(2012, 'March', 2)];
      const wrapper = shallow(<TimelineDisplay {...props} />);

      expect(wrapper.props().layouts.normal[1].x).toBe(2);
    });

    it('[Mobile] all date types in same column', () => {
      props.timeline.events = [
        buildEvent(2012),
        buildEvent(2012, 'March'),
        buildEvent(2012, 'April', 3),
      ];
      const wrapper = shallow(<TimelineDisplay {...props} />);

      expect(wrapper.props().layouts.condensed[1].x).toBe(0);
      expect(wrapper.props().layouts.condensed[2].x).toBe(0);
      expect(wrapper.props().layouts.condensed[3].x).toBe(0);
    });
  });

  describe('[Forward Chronology] places events in proper row order', () => {  
    let wrapper;
    let layoutObj;
    let mobileLayoutObj;
    beforeEach(() => {
      // Comments reprent expected: index,col(x),row(y), default height 2
      // for desktop layout
      // Also factor in year headings with height 2
      // 2012 represents dense year
      // 2013 represents sparse but 'complete' year with all types of dates
      // Other years represent sparse and incomplete years
      props.timeline.events = [
        // 2012 header                   // 0 0 0
        buildEvent(2012),                // 1 0 2
        buildEvent(2012),                // 2 0 4
        buildEvent(2012),                // 3 0 6
        buildEvent(2012),                // 4 0 8
        buildEvent(2012, 'March'),       // 5 1 2
        buildEvent(2012, 'March'),       // 6 1 4
        buildEvent(2012, 'March', 3),    // 7 1 2
        buildEvent(2012, 'March', 5),    // 8 2 4
        buildEvent(2012, 'March', 22),   // 9 2 6
        buildEvent(2012, 'April'),       // 10 1 8
        buildEvent(2012, 'April'),       // 11 1 10
        buildEvent(2012, 'April', 3),    // 12 2 8
        buildEvent(2012, 'April', 6),    // 13 2 10
        // 2013 header                   // 14 0 12
        buildEvent(2013),                // 15 0 14
        buildEvent(2013, 'August'),      // 16 1 14
        buildEvent(2013, 'August', 9),   // 17 2 14
        // 2014 header                   // 18 0 16
        buildEvent(2014),                // 19 0 18
        // 2015 header                   // 20 0 20
        buildEvent(2015, 'March'),       // 21 1 22
        // 2018 header                   // 22 0 24
        buildEvent(2018, 'May', 2),      // 23 0 26
      ];
      wrapper = shallow(<TimelineDisplay {...props} />);
      layoutObj = wrapper.props().layouts.normal;
      mobileLayoutObj = wrapper.props().layouts.condensed;
    });

    it('[Desktop] puts first year, month and day in same row', () => {
      // 2012
      expect(layoutObj[1].y).toBe(2);
      expect(layoutObj[5].y).toBe(2);
      expect(layoutObj[7].y).toBe(2);
      // 2013
      expect(layoutObj[15].y).toBe(14);
      expect(layoutObj[16].y).toBe(14);
      expect(layoutObj[17].y).toBe(14);
    });

    it('[Desktop] puts months of same year in consecutive rows', () => {
      // March 2012
      expect(layoutObj[5].y).toBe(2);
      expect(layoutObj[6].y).toBe(4);
      // April 2012
      expect(layoutObj[10].y).toBe(8);
      expect(layoutObj[11].y).toBe(10);
    });

    it('[Desktop] puts days of same month,year in consecutive rows', () => {
      // March 2012
      expect(layoutObj[7].y).toBe(2);
      expect(layoutObj[8].y).toBe(4);
      expect(layoutObj[9].y).toBe(6);
      // April 2012
      expect(layoutObj[12].y).toBe(8);
      expect(layoutObj[13].y).toBe(10);
    });

    it('[Desktop] cascades different years + date types into diagonal', () => {
      expect(layoutObj[19].y).toBe(18);
      expect(layoutObj[21].y).toBe(22);
      expect(layoutObj[23].y).toBe(26);
    });

    it('[Mobile] places in order all the way through', () => {
      let expectedY = 2;
      // 2012
      for (let i = 1; i < 14; i++) {
        expect(mobileLayoutObj[i].y).toBe(expectedY);
        expectedY += 2;
      }
      // 2013
      expect(mobileLayoutObj[15].y).toBe(30);
      expect(mobileLayoutObj[16].y).toBe(32);
      expect(mobileLayoutObj[17].y).toBe(34);
      // 2014
      expect(mobileLayoutObj[19].y).toBe(38);
      // 2015
      expect(mobileLayoutObj[21].y).toBe(42);
      // 2018  
      expect(mobileLayoutObj[23].y).toBe(46);    
    });
  });
});

function buildEvent(y, m = '', d = '', features = null) {
  const e = new EventProto();
  e.d = d;
  e.m = m;
  e.y = y;
  e.id = id;
  e.ms = buildDateTime(d, m, y);
  id += 1;
  if (features) {
    if (features.contains(EventFeatures.LONG_DESC)) {
      e.de = `This is a very long description intended to 
        trigger the rule for events with long descriptions
        being of greater height`;
    } else if (features.contains(EventFeatures.DESC)) {
      e.de = 'testDesc';
    }
    if (features.contains(EventFeatures.IMG)) {
      e.i = 'testImg';
    }
    if (features.contains(EventFeatures.TG)) {
      e.tg = ['testTag1', 'testTag2'];
    }
  }
  return e;
}
