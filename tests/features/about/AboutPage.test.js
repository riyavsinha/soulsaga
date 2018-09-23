import React from 'react';
import { shallow } from 'enzyme';
import { AboutPage } from '../../../src/features/about/AboutPage';

describe('about/AboutPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      about: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AboutPage {...props} />
    );

    expect(
      renderedComponent.find('.about-about-page').length
    ).toBe(1);
  });
});
