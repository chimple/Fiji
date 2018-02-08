import { contentDB, remoteContentDB } from '../db'

const FETCH_GAME_HIGH_SCORES_REQUEST = 'Fiji/game/FETCH_GAME_HIGH_SCORES_REQUEST'
const FETCH_GAME_HIGH_SCORES_SUCCESS = 'Fiji/game/FETCH_GAME_HIGH_SCORES_SUCCESS'
const FETCH_GAME_HIGH_SCORES_FAILURE = 'Fiji/game/FETCH_GAME_HIGH_SCORES_FAILURE'
const ADD_SCORE = 'Fiji/game/ADD_SCORE'
const RESET_SCORE = 'Fiji/game/RESET_SCORE'

export const initialState = {
  isFetching: false,
  gameHighScores: [],
  myScore: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GAME_HIGH_SCORES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_GAME_HIGH_SCORES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        gameHighScores: action.gameHighScores
      }
    case FETCH_GAME_HIGH_SCORES_FAILURE:
      return {
        ...state,
        isFetching: false,
        gameHighScores: []
      }
    case ADD_SCORE:
      return {
        ...state,
        myScore: state.myScore + action.myScore
      }
    case RESET_SCORE:
      return {
        ...state,
        myScore: 0
      }
    default:
      return state
  }
}

export const fetchGameHighScoresRequest = () => ({
  type: FETCH_GAME_HIGH_SCORES_REQUEST
})

export const fetchGameHighScoresSuccess = (gameHighScores) => ({
  type: FETCH_GAME_HIGH_SCORES_SUCCESS,
  gameHighScores
})

export const fetchGameHighScoresFailure = () => ({
  type: FETCH_GAME_HIGH_SCORES_FAILURE
})

export const addMyScore = (myScore) => ({
  type: ADD_SCORE,
  myScore
})

export const resetScore = () => ({
  type: RESET_SCORE
})

export const fetchGameHighScores = (game_id) => async (dispatch, getState) => {
  try {
    dispatch(fetchGameHighScoresRequest())
    const result = await contentDB.allDocs({
      startkey: 'high-score:' + game_id,
      endkey: 'high-score:' + game_id + '\ufff0',
      include_docs: true
    })
    const highScores = result.rows
      .map(function (row) { return row.doc })
      .sort((a, b) => {
        return b.score - a.score
      })
    dispatch(fetchGameHighScoresSuccess(highScores))
  } catch (error) {
    console.log('fetchGameHighScores: ' + error)
    dispatch(fetchGameHighScoresFailure())
  }
}

export const finalizeScore = (user_id, game_id, myScore) => async (dispatch, getState) => {
  console.log(myScore)
  let currentHighScoreDoc = null
  try {
    currentHighScoreDoc = await contentDB.get('high-score:' + game_id + ':' + user_id)
  } catch (error) {
    console.log('finalizeScore: ' + error)
  }
  console.log(currentHighScoreDoc)
  console.log(currentHighScoreDoc.score)
  try {
    if (currentHighScoreDoc == null) {
      const result = await contentDB.put({
        _id: 'high-score:' + game_id + ':' + user_id,
        user_id,
        score: myScore
      })
      console.log(result)      
    } else if(myScore > currentHighScoreDoc.score) {
      console.log('updating score:'+myScore)
      const result = await contentDB.put({
        _id: 'high-score:' + game_id + ':' + user_id,
        _rev: currentHighScoreDoc._rev,
        user_id,
        score: myScore
      })
      console.log(result)
    } else {
      console.log('here')
    }
  } catch (error) {
    console.log('finalizeScore: ' + error)
  }
}

export default reducer