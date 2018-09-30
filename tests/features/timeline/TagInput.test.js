import React from 'react';
import { shallow } from 'enzyme';
import { TagInput } from '../../../src/features/timeline';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<TagInput />);
  expect(renderedComponent.find('.timeline-tag-input').length).toBe(1);
});
