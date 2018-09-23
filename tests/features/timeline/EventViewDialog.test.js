import React from 'react';
import { shallow } from 'enzyme';
import { EventViewDialog } from '../../../src/features/timeline';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<EventViewDialog />);
  expect(renderedComponent.find('.timeline-event-view-dialog').length).toBe(1);
});
