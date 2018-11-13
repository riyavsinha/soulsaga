import React from 'react';
import { shallow } from 'enzyme';
import { GoalColumn } from '../../../src/features/goal-discovery/GoalColumn';

describe('goal-discovery/GoalColumn', () => {
  it('renders node with correct class name', () => {
    const props = {
      goalDiscovery: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <GoalColumn {...props} />
    );

    expect(
      renderedComponent.find('.goal-discovery-goal-column').length
    ).toBe(1);
  });
});
