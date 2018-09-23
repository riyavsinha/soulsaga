import React from 'react';
import { shallow } from 'enzyme';
import { TimelineSettingsPanel } from '../../../src/features/profile/TimelineSettingsPanel';

describe('profile/TimelineSettingsPanel', () => {
  it('renders node with correct class name', () => {
    const props = {
      profile: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TimelineSettingsPanel {...props} />
    );

    expect(
      renderedComponent.find('.profile-timeline-settings-panel').length
    ).toBe(1);
  });
});
