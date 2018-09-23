import React from 'react';
import { shallow } from 'enzyme';
import { SwitchSetting } from '../../../src/features/profile';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<SwitchSetting />);
  expect(renderedComponent.find('.profile-switch-setting').length).toBe(1);
});
