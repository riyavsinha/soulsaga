import React from 'react';
import { shallow } from 'enzyme';
import { AccountPanel } from '../../../src/features/profile/AccountPanel';

describe('profile/AccountPanel', () => {
  it('renders node with correct class name', () => {
    const props = {
      profile: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AccountPanel {...props} />
    );

    expect(
      renderedComponent.find('.profile-account-panel').length
    ).toBe(1);
  });
});
