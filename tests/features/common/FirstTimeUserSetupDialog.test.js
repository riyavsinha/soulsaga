import React from 'react';
import { shallow } from 'enzyme';
import { FirstTimeUserSetupDialog } from '../../../src/features/common/FirstTimeUserSetupDialog';

describe('common/FirstTimeUserSetupDialog', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FirstTimeUserSetupDialog {...props} />
    );

    expect(
      renderedComponent.find('.common-first-time-user-setup-dialog').length
    ).toBe(1);
  });
});
