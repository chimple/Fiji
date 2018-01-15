import { usersDB, remoteUsersDB } from '../db'

const ADD_USER_REQUEST = 'Fiji/user/ADD_USER_REQUEST'
const ADD_USER_SUCCESS = 'Fiji/user/ADD_USER_SUCCESS'
const ADD_USER_FAILURE = 'Fiji/user/ADD_USER_FAILURE'

export const initialState = {
  isFetching: false,
  user: {},
  error: ''
}

export default reducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: ''
      }
    case ADD_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        user: action.user,
        error: ''
      }
    case ADD_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        user: {},
        error: action.error
      }
    default:
      return state
  }
}

export const addUserRequest = () => ({
  type: ADD_USER_REQUEST
})

export const addUserSuccess = (user) => ({
  type: ADD_USER_SUCCESS,
  user
})

export const addUserFailure = (error) => ({
  type: ADD_USER_FAILURE,
  error
})

export const addUser = (user) => async(dispatch) => {
  try {
    dispatch(addUserRequest())
    const response = await usersDB.post({
      name: user.name,
      image: user.image
    })
    const addedUser = await usersDB.get(response.id)
    dispatch(addUserSuccess(addedUser))
    const syncResult = await usersDB.sync(remoteUsersDB)
    console.log(syncResult)
  } catch(error) {
    console.log('_getAllUser: ' + error)
    dispatch(addUserFailure(error))
  }
}
