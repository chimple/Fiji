jest.mock('../../db')

import { contentDB } from '../../db'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import games, {
  initialState,
  fetchGamesFailure,
  fetchGamesRequest,
  fetchGamesSuccess,
  fetchGames,
  fetchGameThemeFailure,
  fetchGameThemeRequest,
  fetchGameThemeSuccess,
  fetchGameTheme,
} from '../game'
import { games as gamesData, gameThemeData } from '../../../config/jest/mockData'

// test reducers

it('returns the same state on an unhandled action', () => {
  expect(games(initialState, { type: '_NULL' })).toMatchSnapshot()
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

it('handles FETCH_GAME_THEME_REQUEST action', () => {
  expect(games(initialState, fetchGameThemeRequest())).toMatchSnapshot()
})

it('handles FETCH_GAME_THEME_SUCCESS action', () => {
  expect(games(initialState, fetchGameThemeSuccess(gameThemeData[0]))).toMatchSnapshot()
})

it('handles FETCH_GAME_THEME_FAILURE action', () => {
  expect(games(initialState, fetchGameThemeFailure())).toMatchSnapshot()
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

it('creates a FETCH_GAME_THEME_REQUEST action', () => {
  expect(fetchGameThemeRequest()).toMatchSnapshot()
})

it('creates a FETCH_GAME_THEME_SUCCESS action', () => {
  expect(fetchGameThemeSuccess(gameThemeData[0])).toMatchSnapshot()
})

it('creates a FETCH_GAME_THEME_FAILURE action', () => {
  expect(fetchGameThemeFailure()).toMatchSnapshot()
})

// test thunks

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('handles fetchGames action', async () => {
  const store = mockStore(initialState)
  contentDB.allDocs = jest.fn()
    .mockReturnValue({
      rows: gamesData.map(function (doc) {
        return { doc }
      })
    })
  await store.dispatch(fetchGames())
  expect(store.getActions()).toMatchSnapshot()
})  

it('handles fetchGameTheme action', async () => {
  const store = mockStore(initialState)
  contentDB.get = jest.fn()
    .mockReturnValue(gameThemeData[0])
  await store.dispatch(fetchGameTheme(gamesData[0]._id))
  expect(store.getActions()).toMatchSnapshot()
})  