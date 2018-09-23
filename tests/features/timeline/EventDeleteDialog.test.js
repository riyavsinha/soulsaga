import React from 'react';
import { shallow } from 'enzyme';
import { EventDeleteDialog } from '../../../src/features/timeline/EventDeleteDialog';

describe('timeline/EventDeleteDialog', () => {
  it('renders node with correct class name', () => {
    const props = {
      timeline: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <EventDeleteDialog {...props} />
    );

    expect(
      renderedComponent.find('.timeline-event-delete-dialog').length
    ).toBe(1);
  });
});
