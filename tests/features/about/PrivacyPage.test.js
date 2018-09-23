import React from 'react';
import { shallow } from 'enzyme';
import { PrivacyPage } from '../../../src/features/about/PrivacyPage';

describe('about/PrivacyPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      about: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PrivacyPage {...props} />
    );

    expect(
      renderedComponent.find('.about-privacy-page').length
    ).toBe(1);
  });
});
