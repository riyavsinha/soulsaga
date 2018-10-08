import React from 'react';
import { shallow } from 'enzyme';
import { ChronologicalOrderSelect } from '../../../src/features/timeline/ChronologicalOrderSelect';

describe('timeline/ChronologicalOrderSelect', () => {
  it('renders node with correct class name', () => {
    const props = {
      timeline: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ChronologicalOrderSelect {...props} />
    );

    expect(
      renderedComponent.find('.timeline-chronological-order-select').length
    ).toBe(1);
  });
});
