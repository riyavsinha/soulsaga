import React from 'react';
import { shallow } from 'enzyme';
import { TermsPage } from '../../../src/features/about/TermsPage';

describe('about/TermsPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      about: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <TermsPage {...props} />
    );

    expect(
      renderedComponent.find('.about-terms-page').length
    ).toBe(1);
  });
});
