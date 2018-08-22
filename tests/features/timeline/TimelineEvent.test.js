import React from 'react';
import { shallow } from 'enzyme';
import { TimelineEvent } from '../../../src/features/timeline/TimelineEvent';

describe('timeline/TimelineEvent', () => {
  it('renders node with correct class name', () => {
    const props = {
      timeline: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TimelineEvent {...props} />
    );

    expect(
      renderedComponent.find('.timeline-timeline-event').length
    ).toBe(1);
  });
});
