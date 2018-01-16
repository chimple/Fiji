import { usersDB, remoteUsersDB } from '../db'

const FETCH_USERS_REQUEST = 'Fiji/users/FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'Fiji/users/FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'Fiji/users/FETCH_USERS_FAILURE'

export const initialState = {
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

export const fetchUsers = () => async(dispatch) => {
  dispatch(fetchUsersRequest())
  try {
    const syncResult = await usersDB.sync(remoteUsersDB)
    console.log(syncResult)
    const result = await usersDB.allDocs({include_docs: true})
    dispatch(fetchUsersSuccess(result.rows.map(function(row) { return row.doc})))
  } catch(error) {
    console.log('_getAllUsers: ' + error)
    dispatch(fetchUsersFailure())
  }

}
