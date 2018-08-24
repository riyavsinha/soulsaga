import React from 'react';
import { shallow } from 'enzyme';
import { TitleBar } from '../../../src/features/common/TitleBar';

describe('common/TitleBar', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TitleBar {...props} />
    );

    expect(
      renderedComponent.find('.common-title-bar').length
    ).toBe(1);
  });
});
