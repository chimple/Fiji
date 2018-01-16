jest.mock('../../db')

import { usersDB } from '../../db'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import users, { initialState, fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess, fetchUsers } from '../users'
import { users as usersData } from '../../../config/jest/mockData'

// test reducers

it('returns the same state on an unhandled action', () => {
  expect(users(initialState, {type: '_NULL'})).toMatchSnapshot()
})

it('handles FETCH_USERS_REQUEST action', () => {
  expect(users(initialState, fetchUsersRequest())).toMatchSnapshot()
})

it('handles FETCH_USERS_SUCCESS action', () => {
  expect(users(initialState, fetchUsersSuccess(usersData))).toMatchSnapshot()
})

it('handles FETCH_USERS_FAILURE action', () => {
  expect(users(initialState, fetchUsersFailure())).toMatchSnapshot()
})

// test actions

it('creates a FETCH_USERS_REQUEST action', () => {
  expect(fetchUsersRequest()).toMatchSnapshot()
})

it('creates a FETCH_USERS_SUCCESS action', () => {
  expect(fetchUsersSuccess(usersData)).toMatchSnapshot()
})

it('creates a FETCH_USERS_FAILURE action', () => {
  expect(fetchUsersFailure()).toMatchSnapshot()
})

// test thunks

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('handles fetchUsers action', async () => {
  const store = mockStore(initialState)
  usersDB.sync = jest.fn()
    .mockReturnValue({})
  usersDB.allDocs = jest.fn()
    .mockReturnValue({
      rows: usersData.map(function(doc) {
        return { doc }
      })
    })
  await store.dispatch(fetchUsers())
  expect(store.getActions()).toMatchSnapshot()
})