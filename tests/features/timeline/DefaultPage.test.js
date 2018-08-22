import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/timeline/DefaultPage';

describe('timeline/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      timeline: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.timeline-default-page').length
    ).toBe(1);
  });
});
