import { usersDB, remoteUsersDB } from '../db'

const FETCH_USERS_REQUEST = 'Fiji/users/FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'Fiji/users/FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'Fiji/users/FETCH_USERS_FAILURE'

const initialState = {
  isFetching: false,
  list: []
}

export default reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_USERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.users
      })
    case FETCH_USERS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        list: []
      })
    default:
      return state
  }
}

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST
})

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  users
})

export const fetchUsersFailure = () => ({
  type: FETCH_USERS_FAILURE
})

export const fetchUsers = () => {
  return function(dispatch) {
    dispatch(fetchUsersRequest())
    usersDB.sync(remoteUsersDB).then(function (result) {
      console.log(result)
      usersDB.allDocs({include_docs: true})
      .then(function(result) {
        dispatch(fetchUsersSuccess(result.rows.map(function(row) { return row.doc})))
      }).catch(function (err) {
          console.log('_getAllUsers: ' + err)
      })  
    }).catch(function (err) {
      console.log(err)
    })
  }
}
