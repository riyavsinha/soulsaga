import React from 'react';
import firebase from 'common/firebase';
import { shallow } from 'enzyme';
import { TimelineDisplayWrapper } from 'features/timeline/TimelineDisplayWrapper';
import TimelineDisplay from 'features/timeline/TimelineDisplay';

describe('timeline/TimelineDisplayWrapper', () => {
  let fetchFn;
  beforeEach(() => {
    jest.mock('firebase');
    fetchFn = jest.fn();
  });

  it('renders TimelineDisplay and makes fetch if all conditions met', () => {
    // Mock authstate to perform callback with user
    firebase.auth().onAuthStateChanged = jest.fn(cb => cb({ name: 'Shaun' }));

    // Render
    const props = {
      timeline: { hasLoadedEvents: false },
      common: { timelineConsent: true },
      actions: { fetchEvents: fetchFn },
    };
    const renderedComponent = shallow(<TimelineDisplayWrapper {...props} />);

    expect(firebase.auth().onAuthStateChanged.mock.calls.length).toBe(1);
    expect(fetchFn.mock.calls.length).toBe(1);
    expect(renderedComponent.find(TimelineDisplay).length).toBe(1);
  });

  it('renders TimelineDisplay and doesnt fetch if no user consent', () => {
    // Mock authstate to perform callback with user
    firebase.auth().onAuthStateChanged = jest.fn(cb => cb({ name: 'Shaun' }));

    // Render
    const props = {
      timeline: { hasLoadedEvents: false },
      common: { timelineConsent: false },
      actions: { fetchEvents: fetchFn },
    };
    const renderedComponent = shallow(<TimelineDisplayWrapper {...props} />);

    expect(firebase.auth().onAuthStateChanged.mock.calls.length).toBe(1);
    expect(fetchFn.mock.calls.length).toBe(0);
    expect(renderedComponent.find(TimelineDisplay).length).toBe(1);
  });

  it('renders TimelineDisplay and doesnt fetch if has already fetched', () => {
    // Mock authstate to perform callback with user
    firebase.auth().onAuthStateChanged = jest.fn(cb => cb({ name: 'Shaun' }));

    // Render
    const props = {
      timeline: { hasLoadedEvents: true },
      common: { timelineConsent: true },
      actions: { fetchEvents: fetchFn },
    };
    const renderedComponent = shallow(<TimelineDisplayWrapper {...props} />);

    expect(firebase.auth().onAuthStateChanged.mock.calls.length).toBe(1);
    expect(fetchFn.mock.calls.length).toBe(0);
    expect(renderedComponent.find(TimelineDisplay).length).toBe(1);
  });

  it('renders TimelineDisplay and doesnt fetch if no user', () => {
    // Mock authstate to perform callback with no user
    firebase.auth().onAuthStateChanged = jest.fn(cb => cb(/* no user */));

    // Render
    const props = {
      timeline: { hasLoadedEvents: false },
      common: { timelineConsent: true },
      actions: { fetchEvents: fetchFn },
    };
    const renderedComponent = shallow(<TimelineDisplayWrapper {...props} />);

    expect(firebase.auth().onAuthStateChanged.mock.calls.length).toBe(1);
    expect(fetchFn.mock.calls.length).toBe(0);
    expect(renderedComponent.find(TimelineDisplay).length).toBe(1);
  });
});
