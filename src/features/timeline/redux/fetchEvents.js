import {
  TIMELINE_FETCH_EVENTS_BEGIN,
  TIMELINE_FETCH_EVENTS_SUCCESS,
  TIMELINE_FETCH_EVENTS_FAILURE,
  TIMELINE_FETCH_EVENTS_DISMISS_ERROR,
} from './constants';
import EventProto from 'proto/EventProto';
import { database, CRAL, TIMELINE} from 'common/firebase';
import { ab2str } from 'common/util/strbuffer';

export function fetchEvents(args = {}) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: TIMELINE_FETCH_EVENTS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      // const ref = database
      //     .ref(TIMELINE + getState().common.user.uid)
      //     .orderByChild("ms");
      // const fetchPromise = ref.once('value', (snapshot) => {
      //   let events = [];
      //   snapshot.forEach(child => {
      //     let e = decodeEvent(child.val(), getState);
      //     e.ref = child.key;
      //     events.push(e);
      //   })
      //   console.log(events);
      //   return events;
      // });
      const fetchPromise = fetchEvents(getState);
      fetchPromise.then(
        (res) => {
          console.log(res);
          dispatch({
            type: TIMELINE_FETCH_EVENTS_SUCCESS,
            events: res,
          });
          resolve(res);
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

async function fetchEvents(getState) {
  const ref = database
          .ref(TIMELINE + getState().common.user.uid)
          .orderByChild("ms");
  const fetchData = await ref.once('value');
  console.log(fetchData);
  let events = [];
  let refs = [];
  fetchData.forEach(child => {
    events.push(child.val());
    refs.push(child.key);
  })
  console.log(events);
  for (let i in events) {
    events[i] = await decodeEvent(events[i], getState);
    events[i].ref = refs[i];
  }
  console.log(events);
  return events
  // await fetchData.forEach(await (async child => {
  //   let e = await decodeEvent(child.val(), getState);
  //   console.log(e);
  //   e.ref = child.key;
  //   eventPromises.push(e);
  // }));
  // console.log(eventPromises)
  // const events = await Promise.all(eventPromises);
  // console.log(events);
  // return events;
  // (snapshot) => {
  //   let events = [];
  //   snapshot.forEach(child => {
  //     let e = decodeEvent(child.val(), getState);
  //     e.ref = child.key;
  //     events.push(e);
  //   })
  //   console.log(events);
  //   return events;
  // });
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
  console.log(e);
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
        hasLoadedEvents: true,
        fetchEventsPending: false,
        fetchEventsError: null,
      };

    case TIMELINE_FETCH_EVENTS_FAILURE:
      // The request is failed
      return {
        ...state,
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
