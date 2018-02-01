jest.mock('../../db')

import { contentDB } from '../../db'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import score, {
  initialState,
  fetchGameHighScoresRequest,
  fetchGameHighScoresSuccess,
  fetchGameHighScoresFailure,
  addScore,
  fetchGameHighScores
} from '../score'
import { highScoresData } from '../../../config/jest/mockData'

// test reducers

it('returns the same state on an unhandled action', () => {
  expect(score(initialState, { type: '_NULL' })).toMatchSnapshot()
})

it('handles FETCH_GAME_HIGH_SCORES_REQUEST action', () => {
  expect(score(initialState, fetchGameHighScoresRequest())).toMatchSnapshot()
})

it('handles FETCH_GAME_HIGH_SCORES_SUCCESS action', () => {
  expect(score(initialState, fetchGameHighScoresSuccess(highScoresData))).toMatchSnapshot()
})

it('handles FETCH_GAME_HIGH_SCORES_FAILURE action', () => {
  expect(score(initialState, fetchGameHighScoresFailure())).toMatchSnapshot()
})

// test actions

it('creates a FETCH_GAME_HIGH_SCORES_REQUEST action', () => {
  expect(fetchGameHighScoresRequest()).toMatchSnapshot()
})

it('creates a FETCH_GAME_HIGH_SCORES_SUCCESS action', () => {
  expect(fetchGameHighScoresSuccess(highScoresData)).toMatchSnapshot()
})

it('creates a FETCH_GAME_HIGH_SCORES_FAILURE action', () => {
  expect(fetchGameHighScoresFailure()).toMatchSnapshot()
})

// test thunks

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('handles fetchGameHighScores action', async () => {
  const store = mockStore(initialState)
  contentDB.allDocs = jest.fn()
    .mockReturnValue({
      rows: highScoresData.map(function(doc) {
        return { doc }
      })
    })
  await store.dispatch(fetchGameHighScores('game:memory-matching'))
  expect(store.getActions()).toMatchSnapshot()
})