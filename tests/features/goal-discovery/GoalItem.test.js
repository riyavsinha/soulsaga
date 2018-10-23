import React from 'react';
import { shallow } from 'enzyme';
import { GoalItem } from '../../../src/features/goal-discovery';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<GoalItem />);
  expect(renderedComponent.find('.goal-discovery-goal-item').length).toBe(1);
});
