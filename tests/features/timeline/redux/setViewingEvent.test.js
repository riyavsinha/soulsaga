import { TIMELINE_SET_VIEWING_EVENT } from 'features/timeline/redux/constants';
import {
  setViewingEvent,
  reducer,
} from 'features/timeline/redux/setViewingEvent';
import EventProto from 'proto/EventProto';

describe('timeline/redux/setViewingEvent', () => {
  describe('Tests for action', () => {
    it('returns correct action by setViewingEvent', () => {
      expect(setViewingEvent()).toHaveProperty(
        'type',
        TIMELINE_SET_VIEWING_EVENT,
      );
    });

    it('returns null event when no parameter set', () => {
      expect(setViewingEvent()).toHaveProperty('event', null);
    });

    it('returns event when event set', () => {
      const testEvent = new EventProto();
      expect(setViewingEvent(testEvent)).toHaveProperty('event', testEvent);
    });
  });

  describe('Tests for reducer', () => {
    it('handles action type TIMELINE_SET_VIEWING_EVENT correctly and sets to null', () => {
      const prevState = { viewingEvent: new EventProto() };
      const state = reducer(prevState, {
        type: TIMELINE_SET_VIEWING_EVENT,
        event: null,
      });

      // Should be immutable
      expect(state).not.toBe(prevState);
      expect(state).toEqual({ viewingEvent: null });
    });

    it('handles action type TIMELINE_SET_VIEWING_EVENT correctly with other event', () => {
      const updatedViewEvent = new EventProto();
      updatedViewEvent.y = '2000';

      const prevState = { viewingEvent: new EventProto() };
      const state = reducer(prevState, {
        type: TIMELINE_SET_VIEWING_EVENT,
        event: updatedViewEvent,
      });

      // Should be immutable
      expect(state).not.toBe(prevState);
      expect(state).toEqual({ viewingEvent: updatedViewEvent });
    });
  });
});
