import { usersDB, remoteUsersDB } from '../db'

export const fetchUsersRequest = () => ({
  type: 'FETCH_USERS_REQUEST'
})

export const fetchUsersSuccess = (users) => ({
  type: 'FETCH_USERS_SUCCESS',
  users
})

export const fetchUsersFailure = () => ({
  type: 'FETCH_USERS_FAILURE'
})

export const fetchUsers = () => {
  return function(dispatch) {
    dispatch(fetchUsersRequest())
    usersDB.sync(remoteUsersDB)
      .on('change', function(info) { //TODO: handle other events
        usersDB.allDocs({include_docs: true}).then(function(result) {
          dispatch(fetchUsersSuccess(result.rows.map(function(row) { return row.doc})))
        }).catch(function (err) {
            console.log(err)
        })
      })
      .on('error', function(err) {
        console.log(err)
      })
  }
}
