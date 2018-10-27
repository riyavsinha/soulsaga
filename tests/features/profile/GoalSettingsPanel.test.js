import React from 'react';
import { shallow } from 'enzyme';
import { GoalSettingsPanel } from '../../../src/features/profile/GoalSettingsPanel';

describe('profile/GoalSettingsPanel', () => {
  it('renders node with correct class name', () => {
    const props = {
      profile: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <GoalSettingsPanel {...props} />
    );

    expect(
      renderedComponent.find('.profile-goal-settings-panel').length
    ).toBe(1);
  });
});
