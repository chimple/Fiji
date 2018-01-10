import PouchDB from 'pouchdb-react-native';

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
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_TITLES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        titles: action.titles
      })
    case FETCH_TITLES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        titles: []
      })
    case FETCH_STORY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_STORY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        story: action.story
      })
    case FETCH_STORY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        story: {}
      })
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

export const fetchTitles = () => {
  return function(dispatch, getState) {
    dispatch(fetchTitlesRequest())
    let storiesDB = new PouchDB('stories')
    storiesDB.replicate.from('http://localhost:5984/' + 'stories').then(function (result) {
      storiesDB.allDocs({startKey: 'storytitle:', endKey: 'storytitle:'+'\ufff0', include_docs: true}).then(function (result) {
        console.log(result)
          dispatch(fetchTitlesSuccess(result.rows.map(function(row) { return row.doc})))
        }).catch(function (err) {
            console.log('fetchTitles: ' + err)
        })
      }).catch(function (err) {
        storiesDB.allDocs({startKey: 'storytitle:', endKey: 'storytitle:'+'\ufff0', include_docs: true}).then(function (result) {
          console.log(result)
            dispatch(fetchTitlesSuccess(result.rows.map(function(row) { return row.doc})))
          }).catch(function (err) {
              console.log('fetchTitles: ' + err)
          })
      })
  }
}

export const fetchStory = ( title ) => {
  return function(dispatch, getState) {
    dispatch(fetchStoryRequest())
    let storiesDB = new PouchDB('stories')
    // story._id is storytitle:xyz, so strip out storytitle:
    storiesDB.get( 'story:' + title._id.substring(11)).then(function (doc) {
      console.log(doc)
        dispatch(fetchStorySuccess(doc))
      }).catch(function (err) {
          console.log('fetchStory: ' + err)
      })
  }
}
