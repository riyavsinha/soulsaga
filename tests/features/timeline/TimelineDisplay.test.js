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
      // prettier-ignore
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
      for (let i = 1; i < props.timeline.events.length; i++) {
        expect(mobileLayoutObj[i].y).toBe(i * 2);
      }
    });
  });

  describe('[Reverse Chronology] places events in proper row order', () => {
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
      // prettier-ignore
      props.timeline.events = [
        // 2018 header                   // 0 0 0
        buildEvent(2018, 'May', 2),      // 1 0 2
        // 2015 header                   // 2 0 4
        buildEvent(2015, 'March'),       // 3 1 6
        // 2014 header                   // 4 0 8
        buildEvent(2014),                // 5 0 10
        // 2013 header                   // 6 0 12
        buildEvent(2013, 'August', 9),   // 7 2 14
        buildEvent(2013, 'August'),      // 8 1 14
        buildEvent(2013),                // 9 0 14
        // 2012 header                   // 10 0 16
        buildEvent(2012, 'April', 6),    // 11 2 18
        buildEvent(2012, 'April', 3),    // 12 2 20
        buildEvent(2012, 'April'),       // 13 1 18
        buildEvent(2012, 'April'),       // 14 1 20
        buildEvent(2012, 'March', 22),   // 15 2 22
        buildEvent(2012, 'March', 5),    // 16 2 24
        buildEvent(2012, 'March', 3),    // 17 1 26
        buildEvent(2012, 'March'),       // 18 1 22
        buildEvent(2012, 'March'),       // 19 1 24
        buildEvent(2012),                // 20 0 18
        buildEvent(2012),                // 21 0 20
        buildEvent(2012),                // 22 0 22
        buildEvent(2012),                // 23 0 24
      ];
      props.timeline.eventOrdering = 'reverse';
      wrapper = shallow(<TimelineDisplay {...props} />);
      layoutObj = wrapper.props().layouts.normal;
      mobileLayoutObj = wrapper.props().layouts.condensed;
    });

    it('[Desktop] puts first year, month and day in same row', () => {
      // 2013
      expect(layoutObj[7].y).toBe(14);
      expect(layoutObj[8].y).toBe(14);
      expect(layoutObj[9].y).toBe(14);
      // 2012
      expect(layoutObj[11].y).toBe(18);
      expect(layoutObj[13].y).toBe(18);
      expect(layoutObj[20].y).toBe(18);
    });

    it('[Desktop] puts months of same year in consecutive rows', () => {
      // April 2012
      expect(layoutObj[13].y).toBe(18);
      expect(layoutObj[14].y).toBe(20);
      // March 2012
      expect(layoutObj[18].y).toBe(22);
      expect(layoutObj[19].y).toBe(24);
    });

    it('[Desktop] puts days of same month,year in consecutive rows', () => {
      // April 2012
      expect(layoutObj[11].y).toBe(18);
      expect(layoutObj[12].y).toBe(20);
      // March 2012
      expect(layoutObj[15].y).toBe(22);
      expect(layoutObj[16].y).toBe(24);
      expect(layoutObj[17].y).toBe(26);
    });

    it('[Desktop] cascades different years + date types into diagonal', () => {
      expect(layoutObj[1].y).toBe(2);
      expect(layoutObj[3].y).toBe(6);
      expect(layoutObj[5].y).toBe(10);
    });

    it('[Mobile] places in order all the way through', () => {
      for (let i = 1; i < props.timeline.events.length; i++) {
        expect(mobileLayoutObj[i].y).toBe(i * 2);
      }
    });
  });

  describe('[Year-Reverse Chronology] places events in proper row order', () => {
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
      // prettier-ignore
      props.timeline.events = [
        // 2018 header                   // 0 0 0
        buildEvent(2018, 'May', 2),      // 1 0 2
        // 2015 header                   // 2 0 4
        buildEvent(2015, 'March'),       // 3 1 6
        // 2014 header                   // 4 0 8
        buildEvent(2014),                // 5 0 10
        // 2013 header                   // 6 0 12
        buildEvent(2013),                // 7 0 14
        buildEvent(2013, 'August'),      // 8 1 14
        buildEvent(2013, 'August', 9),   // 9 2 14
        // 2012 header                   // 10 0 16
        buildEvent(2012),                // 11 0 18
        buildEvent(2012),                // 12 0 20
        buildEvent(2012),                // 13 0 22
        buildEvent(2012),                // 14 0 24
        buildEvent(2012, 'March'),       // 15 1 18
        buildEvent(2012, 'March'),       // 16 1 20
        buildEvent(2012, 'March', 3),    // 17 1 18
        buildEvent(2012, 'March', 5),    // 18 2 20
        buildEvent(2012, 'March', 22),   // 19 2 22
        buildEvent(2012, 'April'),       // 20 1 24
        buildEvent(2012, 'April'),       // 21 1 26
        buildEvent(2012, 'April', 3),    // 22 2 24
        buildEvent(2012, 'April', 6),    // 23 2 26
      ];
      props.timeline.eventOrdering = 'year-reverse';
      wrapper = shallow(<TimelineDisplay {...props} />);
      layoutObj = wrapper.props().layouts.normal;
      mobileLayoutObj = wrapper.props().layouts.condensed;
    });

    it('[Desktop] puts first year, month and day in same row', () => {
      // console.log(layoutObj);
      // 2013
      expect(layoutObj[7].y).toBe(14);
      expect(layoutObj[8].y).toBe(14);
      expect(layoutObj[9].y).toBe(14);
      // 2012
      expect(layoutObj[11].y).toBe(18);
      expect(layoutObj[15].y).toBe(18);
      expect(layoutObj[17].y).toBe(18);
    });

    it('[Desktop] puts months of same year in consecutive rows', () => {
      // March 2012
      expect(layoutObj[15].y).toBe(18);
      expect(layoutObj[16].y).toBe(20);
      // April 2012
      expect(layoutObj[20].y).toBe(24);
      expect(layoutObj[21].y).toBe(26);
    });

    it('[Desktop] puts days of same month,year in consecutive rows', () => {
      // March 2012
      expect(layoutObj[17].y).toBe(18);
      expect(layoutObj[18].y).toBe(20);
      expect(layoutObj[19].y).toBe(22);
      // April 2012
      expect(layoutObj[22].y).toBe(24);
      expect(layoutObj[23].y).toBe(26);
    });

    it('[Desktop] cascades different years + date types into diagonal', () => {
      expect(layoutObj[1].y).toBe(2);
      expect(layoutObj[3].y).toBe(6);
      expect(layoutObj[5].y).toBe(10);
    });

    it('[Mobile] places in order all the way through', () => {
      for (let i = 1; i < props.timeline.events.length; i++) {
        expect(mobileLayoutObj[i].y).toBe(i * 2);
      }
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
