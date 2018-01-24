import { contentDB, remoteContentDB } from '../db'

const FETCH_GAMES_REQUEST = 'Fiji/game/FETCH_GAMES_REQUEST'
const FETCH_GAMES_SUCCESS = 'Fiji/game/FETCH_GAMES_SUCCESS'
const FETCH_GAMES_FAILURE = 'Fiji/game/FETCH_GAMES_FAILURE'
const FETCH_GAME_THEME_REQUEST = 'Fiji/game/FETCH_GAME_THEME_REQUEST'
const FETCH_GAME_THEME_SUCCESS = 'Fiji/game/FETCH_GAME_THEME_SUCCESS'
const FETCH_GAME_THEME_FAILURE = 'Fiji/game/FETCH_GAME_THEME_FAILURE'

const initialState = {
  isFetching: false,
  games: [],
  theme: {}
}

export default reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_GAMES_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        games: action.games
      }
    case FETCH_GAMES_FAILURE:
      return {
        ...state,
        isFetching: false,
        games: []
      }
    case FETCH_GAME_THEME_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_GAME_THEME_SUCCESS:
      return {
        ...state,
        isFetching: false,
        theme: action.theme
      }
    case FETCH_GAME_THEME_FAILURE:
      return {
        ...state,
        isFetching: false,
        theme: {}
      }
    default:
      return state
  }
}

export const fetchGamesRequest = () => ({
  type: FETCH_GAMES_REQUEST
})

export const fetchGamesSuccess = (games) => ({
  type: FETCH_GAMES_SUCCESS,
  games
})

export const fetchGamesFailure = () => ({
  type: FETCH_GAMES_FAILURE
})

export const fetchGameThemeRequest = () => ({
  type: FETCH_GAME_THEME_REQUEST
})

export const fetchGameThemeSuccess = (theme) => ({
  type: FETCH_GAME_THEME_SUCCESS,
  theme
})

export const fetchGameThemeFailure = () => ({
  type: FETCH_GAME_THEME_FAILURE
})

export const fetchGames = () => async(dispatch, getState) => {
  try {
    dispatch(fetchGamesRequest())
    const result = await contentDB.allDocs({
      startkey: 'game:', 
      endkey: 'game:'+'\ufff0', 
      include_docs: true})
    console.log(result)
    let categories = result.rows.reduce(function(grouped, item) { 
      let key = item.doc['category']
      grouped[key] = grouped[key] || []
      grouped[key].push(item.doc)
      return grouped
    }, {})
    let categoryList = []
    for ( category in categories ) {
      categoryList.push({_id: category, category: category, games: categories[category]})
    }
    dispatch(fetchGamesSuccess(categoryList))
  } catch(error) {
      console.log('fetchGames: ' + error)
      dispatch(fetchGamesFailure())
  }
}

export const fetchGameTheme = ( game_id ) => async(dispatch, getState) => {
  try {
    dispatch(fetchGameThemeRequest())
    const theme = await contentDB.get('game_theme:' + game_id.substring(11))
    console.log(theme)
    dispatch(fetchGameThemeSuccess(theme))
  } catch(error) {
      console.log('fetchGameTheme: ' + error)
      dispatch(fetchGameThemeFailure())
  }
}