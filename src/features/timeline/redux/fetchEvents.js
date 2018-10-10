import {
  TIMELINE_FETCH_EVENTS_BEGIN,
  TIMELINE_FETCH_EVENTS_SUCCESS,
  TIMELINE_FETCH_EVENTS_FAILURE,
  TIMELINE_FETCH_EVENTS_DISMISS_ERROR,
} from './constants';
import EventProto from 'proto/EventProto';
import { userStorage, database, CRAL, TIMELINE} from 'common/firebase';
import { ab2str } from 'common/util/strbuffer';
const _ = require('lodash');

export function fetchEvents(args = {}) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: TIMELINE_FETCH_EVENTS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const fetchPromise = getState().common.timelineConsent ?
        performFetch(getState) : Promise.resolve();
      fetchPromise.then(
        (res) => {
          const tags = getState().common.timelineConsent ?
              _.union(...res.map(e => e.tg ? e.tg.split(',') : [])) :
              [];
          dispatch({
            type: TIMELINE_FETCH_EVENTS_SUCCESS,
            events: res,
            tags: tags,
          });
          return [res, tags];
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: TIMELINE_FETCH_EVENTS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      ).then(
        res => {
          let tags = res[1];
          res = res[0]
          const decodedImgEvents = res.map(e => joinImage(e, getState));
          Promise.all(decodedImgEvents).then(events => {
            dispatch({
              type: TIMELINE_FETCH_EVENTS_SUCCESS,
              events: events,
              tags: tags,
            })
          });
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: TIMELINE_FETCH_EVENTS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

async function performFetch(getState) {
  const ref = database
          .ref(TIMELINE + getState().common.user.uid)
          .orderByChild("ms");
  const fetchData = await ref.once('value');
  let events = [];
  let refs = [];
  fetchData.forEach(child => {
    events.push(child.val());
    refs.push(child.key);
  })
  for (let i in events) {
    events[i] = await decodeEvent(events[i], getState);
    events[i].ref = refs[i];
  }
  return events
}

async function decodeEvent(child, getState) {
  const arr = child.data.split('-');
  const iv = new Uint8Array(arr.slice(0, 16));
  const decrypted = await crypto.subtle.decrypt(
    {
      name: CRAL,
      iv: iv
    },
    getState().common.userKey,
    new Uint8Array(arr.slice(16)).buffer
  );
  const e = new EventProto(JSON.parse(ab2str(decrypted)));
  return e;
}

async function joinImage(e, getState) {
  if (!e.hi) { 
    return e;
  }
  const storageRef = userStorage
      .child(getState().common.user.uid)
      .child(e.ref);
  const url = await storageRef.getDownloadURL();
  const imgResponse = await fetch(url);
  const encodedImg = await imgResponse.arrayBuffer();
  const iv = new Uint8Array(encodedImg.slice(0, 16));
  const decrypted = await crypto.subtle.decrypt(
    {
      name: CRAL,
      iv: iv
    },
    getState().common.userKey,
    new Uint8Array(encodedImg.slice(16)).buffer
  );
  e.i = ab2str(decrypted)
  return e;
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchEventsError() {
  return {
    type: TIMELINE_FETCH_EVENTS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case TIMELINE_FETCH_EVENTS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchEventsPending: true,
        fetchEventsError: null,
      };

    case TIMELINE_FETCH_EVENTS_SUCCESS:
      // The request is success
      return {
        ...state,
        events: [
          ...action.events,
        ],
        availableTags: action.tags,
        hasLoadedEvents: true,
        fetchEventsPending: false,
        fetchEventsError: null,
      };

    case TIMELINE_FETCH_EVENTS_FAILURE:
      // The request is failed
      return {
        ...state,
        events: [],
        fetchEventsPending: false,
        fetchEventsError: action.data.error,
      };

    case TIMELINE_FETCH_EVENTS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchEventsError: null,
      };

    default:
      return state;
  }
}
