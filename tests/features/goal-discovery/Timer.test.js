import React from 'react';
import { shallow } from 'enzyme';
import { Timer } from '../../../src/features/goal-discovery/Timer';

describe('goal-discovery/Timer', () => {
  it('renders node with correct class name', () => {
    const props = {
      goalDiscovery: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Timer {...props} />
    );

    expect(
      renderedComponent.find('.goal-discovery-timer').length
    ).toBe(1);
  });
});
