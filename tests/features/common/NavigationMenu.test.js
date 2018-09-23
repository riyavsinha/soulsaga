import React from 'react';
import { shallow } from 'enzyme';
import { NavigationMenu } from '../../../src/features/common';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<NavigationMenu />);
  expect(renderedComponent.find('.common-navigation-menu').length).toBe(1);
});
