import React from 'react';
import { shallow } from 'enzyme';
import { SimpleDialog } from '../../../src/features/library';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SimpleDialog />);
  expect(renderedComponent.find('.library-simple-dialog').length).toBe(1);
});
