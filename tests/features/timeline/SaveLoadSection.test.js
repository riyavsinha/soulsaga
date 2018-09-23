import React from 'react';
import { shallow } from 'enzyme';
import { SaveLoadSection } from '../../../src/features/timeline/SaveLoadSection';

describe('timeline/SaveLoadSection', () => {
  it('renders node with correct class name', () => {
    const props = {
      timeline: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SaveLoadSection {...props} />
    );

    expect(
      renderedComponent.find('.timeline-save-load-section').length
    ).toBe(1);
  });
});
