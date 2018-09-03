import React from 'react';
import { shallow } from 'enzyme';
import { TimelineDisplay } from '../../../src/features/timeline';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<TimelineDisplay />);
  expect(renderedComponent.find('.timeline-timeline-display').length).toBe(1);
});
