import React from 'react';
import { shallow } from 'enzyme';
import { EventFilter } from '../../../src/features/timeline/EventFilter';

describe('timeline/EventFilter', () => {
  it('renders node with correct class name', () => {
    const props = {
      timeline: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EventFilter {...props} />
    );

    expect(
      renderedComponent.find('.timeline-event-filter').length
    ).toBe(1);
  });
});
