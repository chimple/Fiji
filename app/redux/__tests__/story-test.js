jest.mock('../../db')

import { contentDB } from '../../db'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import story, { 
  initialState, 
  fetchTitlesFailure, 
  fetchTitlesRequest, 
  fetchTitlesSuccess, 
  fetchTitles, 
  fetchStoryFailure, 
  fetchStoryRequest, 
  fetchStorySuccess, 
  fetchStory 
} from '../story'
import { 
  titles as titlesData, 
  stories as storiesData 
} from '../../../config/jest/mockData'

// test reducers

it('returns the same state on an unhandled action', () => {
  expect(story(initialState, {type: '_NULL'})).toMatchSnapshot()
})

it('handles FETCH_TITLES_REQUEST action', () => {
  expect(story(initialState, fetchTitlesRequest())).toMatchSnapshot()
})

it('handles FETCH_TITLES_SUCCESS action', () => {
  expect(story(initialState, fetchTitlesSuccess(titlesData))).toMatchSnapshot()
})

it('handles FETCH_TITLES_FAILURE action', () => {
  expect(story(initialState, fetchTitlesFailure())).toMatchSnapshot()
})

// test actions

it('creates a FETCH_TITLES_REQUEST action', () => {
  expect(fetchTitlesRequest()).toMatchSnapshot()
})

it('creates a FETCH_TITLES_SUCCESS action', () => {
  expect(fetchTitlesSuccess(titlesData)).toMatchSnapshot()
})

it('creates a FETCH_TITLES_FAILURE action', () => {
  expect(fetchTitlesFailure()).toMatchSnapshot()
})

it('creates a FETCH_STORY_REQUEST action', () => {
  expect(fetchStoryRequest()).toMatchSnapshot()
})

it('creates a FETCH_STORY_SUCCESS action', () => {
  expect(fetchStorySuccess(storiesData[0])).toMatchSnapshot()
})

it('creates a FETCH_STORY_FAILURE action', () => {
  expect(fetchStoryFailure()).toMatchSnapshot()
})

// test thunks

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('handles fetchTitles action', async () => {
  const store = mockStore(initialState)
  contentDB.replicate = {
    from: jest.fn()
  }
  contentDB.allDocs = jest.fn()
    .mockReturnValue({
      rows: titlesData.map(function(doc) {
        return { doc }
      })
    })
  await store.dispatch(fetchTitles())
  expect(store.getActions()).toMatchSnapshot()
})

it('handles fetchStory action', async () => {
  const store = mockStore(initialState)
  contentDB.get = jest.fn()
    .mockReturnValue(storiesData[0])
  await store.dispatch(fetchTitles())
  expect(store.getActions()).toMatchSnapshot()
})