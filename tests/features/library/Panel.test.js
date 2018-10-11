import React from 'react';
import { shallow } from 'enzyme';
import { Panel } from '../../../src/features/library';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Panel />);
  expect(renderedComponent.find('.library-panel').length).toBe(1);
});
