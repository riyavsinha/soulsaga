import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/goal-discovery/DefaultPage';

describe('goal-discovery/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      goalDiscovery: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.goal-discovery-default-page').length
    ).toBe(1);
  });
});
