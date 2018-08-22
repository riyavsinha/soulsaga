import React from 'react';
import { shallow } from 'enzyme';
import { AddEventForm } from '../../../src/features/timeline/AddEventForm';

describe('timeline/AddEventForm', () => {
  it('renders node with correct class name', () => {
    const props = {
      timeline: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AddEventForm {...props} />
    );

    expect(
      renderedComponent.find('.timeline-add-event-form').length
    ).toBe(1);
  });
});
