import React from 'react';
import { shallow } from 'enzyme';
import { TimelineDisplayWrapper } from '../../../src/features/timeline/TimelineDisplayWrapper';

describe('timeline/TimelineDisplayWrapper', () => {
  it('renders node with correct class name', () => {
    const props = {
      timeline: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TimelineDisplayWrapper {...props} />
    );

    expect(
      renderedComponent.find('.timeline-timeline-display-wrapper').length
    ).toBe(1);
  });
});
