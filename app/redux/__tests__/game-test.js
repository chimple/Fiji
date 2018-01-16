jest.mock('../../db')

import { contentDB } from '../../db'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import games, { initialState, fetchGamesFailure, fetchGamesRequest, fetchGamesSuccess, fetchGames } from '../game'
import { games as gamesData } from '../../../config/jest/mockData'

// test reducers

it('returns the same state on an unhandled action', () => {
  expect(games(initialState, {type: '_NULL'})).toMatchSnapshot()
})

it('handles FETCH_GAMES_REQUEST action', () => {
  expect(games(initialState, fetchGamesRequest())).toMatchSnapshot()
})

it('handles FETCH_GAMES_SUCCESS action', () => {
  expect(games(initialState, fetchGamesSuccess(gamesData))).toMatchSnapshot()
})

it('handles FETCH_GAMES_FAILURE action', () => {
  expect(games(initialState, fetchGamesFailure())).toMatchSnapshot()
})

// test actions

it('creates a FETCH_GAMES_REQUEST action', () => {
  expect(fetchGamesRequest()).toMatchSnapshot()
})

it('creates a FETCH_GAMES_SUCCESS action', () => {
  expect(fetchGamesSuccess(gamesData)).toMatchSnapshot()
})

it('creates a FETCH_GAMES_FAILURE action', () => {
  expect(fetchGamesFailure()).toMatchSnapshot()
})

// test thunks

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('handles fetchGames action', async () => {
  const store = mockStore(initialState)
  contentDB.allDocs = jest.fn()
    .mockReturnValue({
      rows: gamesData.map(function(doc) {
        return { doc }
      })
    })
  await store.dispatch(fetchGames())
  expect(store.getActions()).toMatchSnapshot()
})  