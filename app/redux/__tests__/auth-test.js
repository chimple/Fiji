jest.mock('../../db')

import { contentDB } from '../../db'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import auth, { initialState, syncUserBegin, syncUser } from '../auth'
import { users as userData } from '../../../config/jest/mockData'

// test reducers

it('returns the same state on an unhandled action', () => {
  expect(auth(initialState, {type: '_NULL'})).toMatchSnapshot()
})

it('handles SYNC_USER_BEGIN action', () => {
  expect(auth(initialState, syncUserBegin())).toMatchSnapshot()
})

// test actions

it('creates a SYNC_USER_BEGIN action', () => {
  expect(syncUserBegin(userData[0])).toMatchSnapshot()
})

// TODO: test thunks 