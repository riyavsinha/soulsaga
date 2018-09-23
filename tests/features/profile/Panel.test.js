import React from 'react';
import { shallow } from 'enzyme';
import { Panel } from '../../../src/features/profile';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Panel />);
  expect(renderedComponent.find('.profile-panel').length).toBe(1);
});
