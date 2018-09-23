import React from 'react';
import { shallow } from 'enzyme';
import { SimpleSnackbar } from '../../../src/features/library';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SimpleSnackbar />);
  expect(renderedComponent.find('.library-simple-snackbar').length).toBe(1);
});
