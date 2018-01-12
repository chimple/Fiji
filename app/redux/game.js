import { contentDB, remoteContentDB } from '../db'

const FETCH_GAMES_REQUEST = 'Fiji/game/FETCH_GAMES_REQUEST'
const FETCH_GAMES_SUCCESS = 'Fiji/game/FETCH_GAMES_SUCCESS'
const FETCH_GAMES_FAILURE = 'Fiji/game/FETCH_GAMES_FAILURE'

const initialState = {
  isFetching: false,
  games: []
}

export default reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_GAMES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_GAMES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        games: action.games
      })
    case FETCH_GAMES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        games: []
      })
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

export const fetchGames = () => {
  return function(dispatch, getState) {
    dispatch(fetchGamesRequest())
    contentDB.allDocs({startkey: 'game:', endkey: 'game:'+'\ufff0', include_docs: true}).then(function (result) {
      console.log('fetchGames')
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
    }).catch(function (err) {
      console.log('fetchGames: ' + err)
    })
  }
}
