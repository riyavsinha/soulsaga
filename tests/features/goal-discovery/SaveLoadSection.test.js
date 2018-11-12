import React from 'react';
import { shallow } from 'enzyme';
import { SaveLoadSection } from '../../../src/features/goal-discovery/SaveLoadSection';

describe('goal-discovery/SaveLoadSection', () => {
  it('renders node with correct class name', () => {
    const props = {
      goalDiscovery: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SaveLoadSection {...props} />
    );

    expect(
      renderedComponent.find('.goal-discovery-save-load-section').length
    ).toBe(1);
  });
});
