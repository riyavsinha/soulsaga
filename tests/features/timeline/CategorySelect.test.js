import React from 'react';
import { shallow } from 'enzyme';
import { CategorySelect } from '../../../src/features/timeline';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<CategorySelect />);
  expect(renderedComponent.find('.timeline-category-select').length).toBe(1);
});
