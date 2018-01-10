import PouchDB from 'pouchdb-react-native';
import { receiveMessage } from './chat';

const SYNC_USER_BEGIN = 'Fiji/auth/SYNC_USER_BEGIN'

const initialState = {
  user: {}
}

export default reducer = (state = initialState, action) => {
  switch(action.type) {
    case SYNC_USER_BEGIN:
      return Object.assign({}, state, {
        user: action.user
      })
    default:
      return state
  }
}

export const syncUserBegin = (user) => ({
  type: SYNC_USER_BEGIN,
  user
})

export const syncUser = (user) => {
  return function(dispatch) {
    dispatch(syncUserBegin(user))
    var sync = PouchDB.sync('user_' + user._id, 'http://localhost:5984/' + 'user_' + user._id, {
      live: true,
      retry: true
    }).on('change', function (info) { // handle change
      console.log('change: ' + info)
      info.docs.forEach(doc => {
        if(doc._id.startsWith('chat:')) {
          dispatch(receiveMessage(doc))
        }
      })
    }).on('paused', function (err) { // replication paused (e.g. replication up to date, user went offline)
      console.log('paused: ' + err)
    }).on('active', function () { // replicate resumed (e.g. new changes replicating, user went back online)
      console.log('active')
    }).on('denied', function (err) { // a document failed to replicate (e.g. due to permissions)
      console.error('denied: ' + err)
    }).on('complete', function (info) { // handle complete
      console.log('complete: ' + info)
    }).on('error', function (err) { // handle error
      console.log('error: ' + err)
    })
    
    //sync.cancel(); //TODO: when user logs out
  }
}
