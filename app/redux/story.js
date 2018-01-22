import { contentDB, remoteContentDB } from '../db'

const FETCH_TITLES_REQUEST = 'Fiji/story/FETCH_TITLES_REQUEST'
const FETCH_TITLES_SUCCESS = 'Fiji/story/FETCH_TITLES_SUCCESS'
const FETCH_TITLES_FAILURE = 'Fiji/story/FETCH_TITLES_FAILURE'
const FETCH_STORY_REQUEST = 'Fiji/story/FETCH_STORY_REQUEST'
const FETCH_STORY_SUCCESS = 'Fiji/story/FETCH_STORY_SUCCESS'
const FETCH_STORY_FAILURE = 'Fiji/story/FETCH_STORY_FAILURE'

const initialState = {
  isFetching: false,
  titles: [],
  story: {}
}

export default reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_TITLES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_TITLES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        titles: action.titles
      }
    case FETCH_TITLES_FAILURE:
      return {
        ...state,
        isFetching: false,
        titles: []
      }
    case FETCH_STORY_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_STORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        story: action.story
      }
    case FETCH_STORY_FAILURE:
      return {
        ...state,
        isFetching: false,
        story: {}
      }
    default:
      return state
  }
}

export const fetchTitlesRequest = () => ({
  type: FETCH_TITLES_REQUEST
})

export const fetchTitlesSuccess = (titles) => ({
  type: FETCH_TITLES_SUCCESS,
  titles
})

export const fetchTitlesFailure = () => ({
  type: FETCH_TITLES_FAILURE
})

export const fetchStoryRequest = () => ({
  type: FETCH_STORY_REQUEST
})

export const fetchStorySuccess = ( story ) => ({
  type: FETCH_STORY_SUCCESS,
  story
})

export const fetchStoryFailure = () => ({
  type: FETCH_STORY_FAILURE
})

export const fetchTitles = () => async(dispatch, getState) => {
    dispatch(fetchTitlesRequest())
    try {
      const replResult = await contentDB.replicate.from(remoteContentDB)
    } catch (error) {
      console.log('fetchTitles.replication: ' + error)
    }
    try {
      const result = await contentDB.allDocs({
        startkey: 'storytitle:', 
        endkey: 'storytitle:'+'\ufff0', 
        include_docs: true
      })
      console.log('fetchTitles')
      console.log(result)
      dispatch(fetchTitlesSuccess(result.rows.map(function(row) { return row.doc})))
    } catch(error) {
      console.log('fetchTitles: ' + error)
      dispatch(fetchTitlesFailure())
    }
}

export const fetchStory = ( title ) => async(dispatch, getState) => {
  dispatch(fetchStoryRequest())
  try {
    // story._id is storytitle:xyz, so strip out storytitle:
    const doc = await contentDB.get( 'story:' + title._id.substring(11))
    console.log(doc)
    dispatch(fetchStorySuccess(doc))
  } catch(error) {
      console.log('fetchStory: ' + error)
      dispatch(fetchStoryFailure())
  }
}
