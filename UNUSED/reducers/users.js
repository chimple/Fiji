const initialState = {
  isFetching: false,
  users: []
}

const users = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_USERS_REQUEST':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'FETCH_USERS_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        users: action.users
      })
    case 'FETCH_USERS_FAILURE':
      return Object.assign({}, state, {
        isFetching: false,
        users: []
      })
    default:
      return state
  }
}

export default users