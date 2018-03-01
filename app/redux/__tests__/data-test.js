import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import data, {
  initialState,
  fetchGameDataRequest,
  fetchGameDataSuccess,
  fetchGameDataFailure,
  fetchMultipleChoiceData,
  fetchMatchData,
  fetchSerialData,
  fetchConsecutiveData,
  fetchWordData,
  fetchEquationData,
  fetchCrosswordData,
  fetchTrueOrFalseData,
  fetchRollingData
} from '../data'

// test reducers

it('returns the same state on an unhandled action', () => {
  expect(data(initialState, { type: '_NULL' })).toMatchSnapshot()
})

it('handles FETCH_GAME_DATA_REQUEST action', () => {
  expect(data(initialState, fetchGameDataRequest())).toMatchSnapshot()
})

it('handles FETCH_GAME_DATA_SUCCESS action', () => {
  const genericGameData = [{ a: 1, b: 2 }, { c: 3, d: 4 }]
  expect(data(initialState, fetchGameDataSuccess(genericGameData))).toMatchSnapshot()
})

it('handles FETCH_GAME_DATA_FAILURE action', () => {
  expect(data(initialState, fetchGameDataFailure())).toMatchSnapshot()
})

// test actions

it('creates a FETCH_GAME_DATA_REQUEST action', () => {
  expect(fetchGameDataRequest()).toMatchSnapshot()
})

it('creates a FETCH_GAME_DATA_SUCCESS action', () => {
  const genericGameData = [{ a: 1, b: 2 }, { c: 3, d: 4 }]
  expect(fetchGameDataSuccess(genericGameData)).toMatchSnapshot()
})

it('creates a FETCH_GAME_DATA_FAILURE action', () => {
  expect(fetchGameDataFailure()).toMatchSnapshot()
})

// test thunks

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// Figure out how to handle random entries

it('handles fetchMultipleChoiceData action', () => {
  const store = mockStore(initialState)
  store.dispatch(fetchMultipleChoiceData('set:letters', 4, 2))
  expect(store.getActions()).toMatchSnapshot()
})

it('handles fetchMatchData action', () => {
  const store = mockStore(initialState)
  store.dispatch(fetchMatchData('set:letters', 4, 2))
  expect(store.getActions()).toMatchSnapshot()
})

it('handles fetchSerialData action', () => {
  const store = mockStore(initialState)
  store.dispatch(fetchSerialData('set:letters', 4))
  expect(store.getActions()).toMatchSnapshot()
})

it('handles fetchConsecutiveData action', () => {
  const store = mockStore(initialState)
  store.dispatch(fetchConsecutiveData('set:letters', 5, 4, 3))
  expect(store.getActions()).toMatchSnapshot()
})

it('handles fetchWordData action', () => {
  const store = mockStore(initialState)
  store.dispatch(fetchWordData('set:letters', 5, 4, 3))
  expect(store.getActions()).toMatchSnapshot()
})

it('handles fetchEquationData action', () => {
  const store = mockStore(initialState)
  store.dispatch(fetchEquationData('set:sum', 3, 2))
  expect(store.getActions()).toMatchSnapshot()
})

it('handles fetchCrosswordData action', () => {
  const store = mockStore(initialState)
  store.dispatch(fetchCrosswordData('set:letters', 5, 2))
  expect(store.getActions()).toMatchSnapshot()
})

it('handles fetchTrueOrFalseData action', () => {
  const store = mockStore(initialState)
  store.dispatch(fetchTrueOrFalseData('set:letters', 3))
  expect(store.getActions()).toMatchSnapshot()
})

it('handles fetchRollingData action', () => {
  const store = mockStore(initialState)
  store.dispatch(fetchRollingData('set:letters', 5, 7, 2))
  expect(store.getActions()).toMatchSnapshot()
})

