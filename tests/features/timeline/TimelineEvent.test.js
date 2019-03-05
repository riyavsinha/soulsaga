import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import { mount, shallow } from 'enzyme';
import { TimelineEvent } from '../../../src/features/timeline/TimelineEvent';
import renderer from 'react-test-renderer';
import EventProto from 'proto/EventProto.js';

describe('timeline/TimelineEvent', () => {
  let props;

  beforeEach(() => {
    const e = new EventProto();
    e.t = 'testTitle';
    e.m = 'April';
    e.d = 2;
    e.y = 2010;
    props = {
      event: e,
      common: { user: { displayName: 'Naina' } },
      timeline: {},
      actions: {},
    };
  });

  it('sets event as main viewing event when clicked', () => {
    props.onClick = jest.fn();
    const wrapper = shallow(<TimelineEvent {...props} />);

    wrapper.simulate('click');
    expect(props.onClick.mock.calls.length).toBe(1);
  }); 

  describe('renders proper structure based on event:', () => {
    it('with title, only has CardHeader', () => {
      const renderedComponent = renderer
        .create(<TimelineEvent {...props} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });

    it('with title and description, has CardHeader and CardContent', () => {
      props.event.de = 'testDescription';
      const renderedComponent = renderer
        .create(<TimelineEvent {...props} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });

    it('with title and image, has CardHeader and CardMedia', () => {
      props.event.i = 'testImg';
      const renderedComponent = renderer
        .create(<TimelineEvent {...props} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });

    it(`with title, description and image, has CardHeader, CardContent
        and CardMedia`, () => {
      props.event.de = 'testDescription';
      props.event.i = 'testImg';
      const renderedComponent = renderer
        .create(<TimelineEvent {...props} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });

    it(`with title, tags, description and image, has CardHeader, Chips,
        CardContent and CardMedia`, () => {
      props.event.tg = ['testTag1', 'testTag2'];
      props.event.de = 'testDescription';
      props.event.i = 'testImg';
      const renderedComponent = renderer
        .create(<TimelineEvent {...props} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });

    it(`with tag and no desc/image, container-end class is appended`, () => {
      props.event.tg = ['testTag1', 'testTag2'];
      const renderedComponent = renderer
        .create(<TimelineEvent {...props} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });

    it(`category is transformed to icon`, () => {
      props.event.c = "Family"
      const renderedComponent = renderer
        .create(<TimelineEvent {...props} />)
        .toJSON();

      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
