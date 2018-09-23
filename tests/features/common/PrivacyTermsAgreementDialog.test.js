import React from 'react';
import { shallow } from 'enzyme';
import { PrivacyTermsAgreementDialog } from '../../../src/features/common/PrivacyTermsAgreementDialog';

describe('common/PrivacyTermsAgreementDialog', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PrivacyTermsAgreementDialog {...props} />
    );

    expect(
      renderedComponent.find('.common-privacy-terms-agreement-dialog').length
    ).toBe(1);
  });
});
