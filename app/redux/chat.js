import PouchDB from 'pouchdb-react-native';
import { remoteURL } from '../db';

const START_CHAT_REQUEST = 'Fiji/chat/START_CHAT_REQUEST'
const START_CHAT_SUCCESS = 'Fiji/chat/START_CHAT_SUCCESS'
const START_CHAT_FAILURE = 'Fiji/chat/START_CHAT_FAILURE'
const END_CHAT = 'Fiji/chat/END_CHAT'
const ADD_MESSAGE = 'Fiji/chat/ADD_MESSAGE'

const initialState = {
  isFetching: false,
  messages: [],
  friend: {}
}

export default reducer = (state = initialState, action) => {
  switch(action.type) {
    case START_CHAT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        friend: action.friend
      })
    case START_CHAT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        messages: action.messages
      })
    case START_CHAT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        messages: []
      })
    case END_CHAT:
      return {
        ...state,
        friend: {},
        messages: []
      }
    case ADD_MESSAGE:
      return { 
        ...state,
        messages: [action.message, ...state.messages]
      }
    default:
      return state
  }
}

export const startChatRequest = (friend) => ({
  type: START_CHAT_REQUEST,
  friend
})

export const startChatSuccess = (messages) => ({
  type: START_CHAT_SUCCESS,
  messages
})

export const startChatFailure = () => ({
  type: START_CHAT_FAILURE
})

export const endChat = () => ({
  type: END_CHAT
})

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message
})

export const startChat = (friend) => {
  return function(dispatch, getState) {
    dispatch(startChatRequest(friend))
    let userDB = new PouchDB('user_' + getState().auth.user._id)
    userDB.allDocs({startkey: 'chat:'+friend._id+'\ufff0', endkey: 'chat:'+friend._id, include_docs: true, descending: true}).then(function (result) {
      console.log(result)
        dispatch(startChatSuccess(result.rows.map(function(row) { return row.doc})))
      }).catch(function (err) {
          console.log('startChat: ' + err)
      })
  }
}

export const sendMessage = (friend, message) => { 
  console.log("this is chat send ");
  console.log(friend, message);
  return function(dispatch, getState) {
    let userDB = new PouchDB('user_' + getState().auth.user._id)
    let now = (new Date()).toJSON()
    let msg = {
      _id: 'chat:' + friend._id + ':' + now,
      sender: getState().auth.user._id,
      text: message
    }
    dispatch(addMessage(msg))
    userDB.put(msg).then(function (response) {
      let friendDB = new PouchDB('user_' + friend._id)
      let friendMsg = {
        _id: 'chat:' + getState().auth.user._id + ':' + now,
        sender: getState().auth.user._id,
        text: message
      }  
      friendDB.put(friendMsg).then(function (resp) {
        friendDB.replicate.to(remoteURL + 'user_' + friend._id).then(function (result) {
          console.log(result)
        }).catch(function (err) {
          console.log(err)
        }) 
      })
    })
  }
}

export const receiveMessage = (message) => {
  return function(dispatch, getState) {
    if(message.sender === getState().chat.friend._id) {
      dispatch(addMessage(message))
    }
  }
}