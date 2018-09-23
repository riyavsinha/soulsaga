import React from 'react';
import { shallow } from 'enzyme';
import { DataChangeSnackbars } from '../../../src/features/common/DataChangeSnackbars';

describe('common/DataChangeSnackbars', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DataChangeSnackbars {...props} />
    );

    expect(
      renderedComponent.find('.common-data-change-snackbars').length
    ).toBe(1);
  });
});
