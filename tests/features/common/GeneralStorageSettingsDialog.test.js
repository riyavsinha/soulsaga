import React from 'react';
import { shallow } from 'enzyme';
import { GeneralStorageSettingsDialog } from '../../../src/features/common/GeneralStorageSettingsDialog';

describe('common/GeneralStorageSettingsDialog', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <GeneralStorageSettingsDialog {...props} />
    );

    expect(
      renderedComponent.find('.common-general-storage-settings-dialog').length
    ).toBe(1);
  });
});
