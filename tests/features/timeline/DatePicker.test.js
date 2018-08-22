import React from 'react';
import { shallow } from 'enzyme';
import { DatePicker } from '../../../src/features/timeline';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DatePicker />);
  expect(renderedComponent.find('.timeline-date-picker').length).toBe(1);
});
