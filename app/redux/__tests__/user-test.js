jest.mock('../../db')

import { usersDB } from '../../db'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import user, { initialState, addUserFailure, addUserRequest, addUserSuccess, addUser } from '../user'
import { users as usersData } from '../../../config/jest/mockData'

// test reducers

it('returns the same state on an unhandled action', () => {
  expect(user(initialState, {type: '_NULL'})).toMatchSnapshot()
})

it('handles ADD_USERS_REQUEST action', () => {
  expect(user(initialState, addUserRequest())).toMatchSnapshot()
})

it('handles ADD_USERS_SUCCESS action', () => {
  const userToAdd = {
    name: usersData[0].name,
    image: usersData[0].image
  }
  expect(user(initialState, addUserSuccess(userToAdd))).toMatchSnapshot()
})

it('handles ADD_USERS_FAILURE action', () => {
  expect(user(initialState, addUserFailure())).toMatchSnapshot()
})

// test actions

it('creates a ADD_USERS_REQUEST action', () => {
  expect(addUserRequest()).toMatchSnapshot()
})

it('creates a ADD_USERS_SUCCESS action', () => {
  const userToAdd = {
    name: usersData[0].name,
    image: usersData[0].image
  }
  expect(addUserSuccess(userToAdd)).toMatchSnapshot()
})

it('creates a ADD_USERS_FAILURE action', () => {
  expect(addUserFailure()).toMatchSnapshot()
})

// test thunks

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('handles addUser action', async () => {
  const store = mockStore(initialState)
  usersDB.post = jest.fn()
    .mockReturnValue({
      id: usersData[0]._id
    })
  usersDB.get = jest.fn()
    .mockReturnValue(usersData[0])
  usersDB.sync = jest.fn()
    .mockReturnValue({})
  const userToAdd = {
    name: usersData[0].name,
    image: usersData[0].image
  }
    
  await store.dispatch(addUser(userToAdd));
  expect(store.getActions()).toMatchSnapshot();
})