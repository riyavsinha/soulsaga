import {
  COMMON_FETCH_OR_CREATE_KEY_BEGIN,
  COMMON_FETCH_OR_CREATE_KEY_SUCCESS,
  COMMON_FETCH_OR_CREATE_KEY_FAILURE,
  COMMON_FETCH_OR_CREATE_KEY_DISMISS_ERROR,
} from './constants';
import { ab2str, str2ab } from 'common/util/strbuffer';
import { CRAL } from 'common/firebase';

export function fetchOrCreateKey(gapi) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_FETCH_OR_CREATE_KEY_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const keyPromise = gapi.client.drive.files.list({
        spaces: 'appDataFolder',
        fields: 'files(id, name)',
        pageSize: 5
      }).then(response => {
        console.log(response.result.files);
        if (response.result.files.length === 0) {
          return createAndWriteKey(gapi);
        } else if (response.result.files.length === 1) {
          return readKey(response);
        } else {
          throw new Error('More than one file!')
        }
      });
      keyPromise.then(
        (res) => {
          dispatch({
            type: COMMON_FETCH_OR_CREATE_KEY_SUCCESS,
            key: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: COMMON_FETCH_OR_CREATE_KEY_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

async function createAndWriteKey(gapi) {
  const key = await crypto.subtle.generateKey(
      {
        name: CRAL,
        length: 128,
      },
      true, 
      ["encrypt", "decrypt"]);
  const rawKey = await crypto.subtle.exportKey("raw", key);
  const a = Array.from(new Uint8Array(rawKey));
  // console.log(str2ab(ab2str(rawKey)));
  await gapi.client.drive.files.create({
    parents: ['appDataFolder'],
    name: a.join('-'),
    isAppAuthorized: true,
    fields: 'name,id'
  })
    .then(r => console.log(r))
    .catch(e => console.log(e))
  return key;
}

async function readKey(filesResponse) {
  const fileName = filesResponse.result.files[0].name;
  const rawKey = new Uint8Array(fileName.split('-')).buffer;
  console.log(rawKey);
  return crypto.subtle.importKey(
      "raw", rawKey, CRAL, false, ["encrypt", "decrypt"]);
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissFetchOrCreateKeyError() {
  return {
    type: COMMON_FETCH_OR_CREATE_KEY_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_FETCH_OR_CREATE_KEY_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchOrCreateKeyPending: true,
        fetchOrCreateKeyError: null,
      };

    case COMMON_FETCH_OR_CREATE_KEY_SUCCESS:
      // The request is success
      return {
        ...state,
        userKey: action.key,
        fetchOrCreateKeyPending: false,
        fetchOrCreateKeyError: null,
      };

    case COMMON_FETCH_OR_CREATE_KEY_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchOrCreateKeyPending: false,
        fetchOrCreateKeyError: action.data.error,
      };

    case COMMON_FETCH_OR_CREATE_KEY_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchOrCreateKeyError: null,
      };

    default:
      return state;
  }
}
