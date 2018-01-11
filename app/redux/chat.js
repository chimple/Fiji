import PouchDB from 'pouchdb-react-native';

const FETCH_CHAT_REQUEST = 'Fiji/chat/FETCH_CHAT_REQUEST'
const FETCH_CHAT_SUCCESS = 'Fiji/chat/FETCH_CHAT_SUCCESS'
const FETCH_CHAT_FAILURE = 'Fiji/chat/FETCH_CHAT_FAILURE'
const ADD_MESSAGE = 'Fiji/chat/ADD_MESSAGE'

const initialState = {
  isFetching: false,
  messages: [],
  friend: {}
}

export default reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_CHAT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        friend: action.friend
      })
    case FETCH_CHAT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        messages: action.messages
      })
    case FETCH_CHAT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        messages: []
      })
    case ADD_MESSAGE:
      return { 
        ...state,
        messages: [...state.messages, action.message]
      }
    default:
      return state
  }
}

export const fetchChatRequest = () => ({
  type: FETCH_CHAT_REQUEST
})

export const fetchChatSuccess = (messages) => ({
  type: FETCH_CHAT_SUCCESS,
  messages
})

export const fetchChatFailure = () => ({
  type: FETCH_CHAT_FAILURE
})

export const addMessage = (message) => ({
  type: SEND_MESSAGE_REQUEST,
  message
})

export const fetchChat = (friend) => {
  return function(dispatch, getState) {
    dispatch(fetchChatRequest(friend))
    let userDB = new PouchDB('user_' + getState().auth.user._id)
    userDB.allDocs({startKey: 'chat:'+friend._id+'\ufff0', endKey: 'chat:'+friend._id, include_docs: true, descending: true}).then(function (result) {
      console.log(result)
        dispatch(fetchChatSuccess(result.rows.map(function(row) { return row.doc})))
      }).catch(function (err) {
          console.log('fetchChat: ' + err)
      })
  }
}

export const sendMessage = (friend, message) => {
  return function(dispatch, getState) {
    let userDB = new PouchDB('user_' + getState().auth.user._id)
    let msg = {
      _id: 'chat:'+friend._id+ (new Date()).toJSON(),
      sender: getState().auth.user._id,
      text: message
    }
    addMessage(msg)
    userDB.put(msg).then(function (response) {
      let friendDB = new PouchDB('user_' + friend._id)
      friendDB.put(msg).then(function (resp) {
        friendDB.replicate.to('http://localhost:5984/' + 'user_' + friend._id).then(function (result) {
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
    //TODO: currently all messages are coming here and getting filtered
    if(message.sender == getState().chat.friend._id) {
      addMessage(msg)
    }
  }
}