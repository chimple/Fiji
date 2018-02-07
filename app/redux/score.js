import { contentDB, remoteContentDB } from '../db'

const FETCH_GAME_HIGH_SCORES_REQUEST = 'Fiji/game/FETCH_GAME_HIGH_SCORES_REQUEST'
const FETCH_GAME_HIGH_SCORES_SUCCESS = 'Fiji/game/FETCH_GAME_HIGH_SCORES_SUCCESS'
const FETCH_GAME_HIGH_SCORES_FAILURE = 'Fiji/game/FETCH_GAME_HIGH_SCORES_FAILURE'
const ADD_SCORE = 'Fiji/game/ADD_SCORE'

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
  try {
    const currentHighScore = await contentDB.get('high-score:' + game_id + ':' + user_id)
    if (myScore > currentHighScore) {
      const result = await contentDB.put({
        _id: 'high-score:' + game_id + ':' + user_id,
        user_id,
        myScore
      })
      console.log(result)
    }
  } catch (error) {
    console.log('finalizeScore: ' + error)
  }
}

export default reducer