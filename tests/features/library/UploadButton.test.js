import React from 'react';
import { shallow } from 'enzyme';
import { UploadButton } from '../../../src/features/library';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<UploadButton />);
  expect(renderedComponent.find('.library-upload-button').length).toBe(1);
});
