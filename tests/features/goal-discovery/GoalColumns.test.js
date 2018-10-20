import React from 'react';
import { shallow } from 'enzyme';
import { GoalColumns } from '../../../src/features/goal-discovery';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<GoalColumns />);
  expect(renderedComponent.find('.goal-discovery-goal-columns').length).toBe(1);
});
