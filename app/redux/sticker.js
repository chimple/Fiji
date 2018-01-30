import { contentDB, remoteContentDB } from '../db'

const FETCH_STICKER_PACKS_REQUEST = 'Fiji/game/FETCH_STICKER_PACKS_REQUEST'
const FETCH_STICKER_PACKS_SUCCESS = 'Fiji/game/FETCH_STICKER_PACKS_SUCCESS'
const FETCH_STICKER_PACKS_FAILURE = 'Fiji/game/FETCH_STICKER_PACKS_FAILURE'
const FETCH_STICKERS_REQUEST = 'Fiji/game/FETCH_STICKERS_REQUEST'
const FETCH_STICKERS_SUCCESS = 'Fiji/game/FETCH_STICKERS_SUCCESS'
const FETCH_STICKERS_FAILURE = 'Fiji/game/FETCH_STICKERS_FAILURE'
const FETCH_STICKER_REQUEST = 'Fiji/game/FETCH_STICKER_REQUEST'
const FETCH_STICKER_SUCCESS = 'Fiji/game/FETCH_STICKER_SUCCESS'
const FETCH_STICKER_FAILURE = 'Fiji/game/FETCH_STICKER_FAILURE'

const initialState = {
  isFetching: false,
  packs: [],
  stickers: [],
  sticker: {}
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_STICKER_PACKS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_STICKER_PACKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        packs: action.packs
      }
    case FETCH_STICKER_PACKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        packs: []
      }
    case FETCH_STICKERS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_STICKERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        stickers: action.stickers
      }
    case FETCH_STICKERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        stickers: []
      }
    case FETCH_STICKER_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_STICKER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        sticker: action.sticker
      }
    case FETCH_STICKER_FAILURE:
      return {
        ...state,
        isFetching: false,
        sticker: {}
      }
    default:
      return state
  }
}

export const fetchStickerPacksRequest = () => ({
  type: FETCH_STICKER_PACKS_REQUEST
})

export const fetchStickerPacksSuccess = (packs) => ({
  type: FETCH_STICKER_PACKS_SUCCESS,
  packs
})

export const fetchStickerPacksFailure = () => ({
  type: FETCH_STICKER_PACKS_FAILURE
})

export const fetchStickersRequest = () => ({
  type: FETCH_STICKERS_REQUEST
})

export const fetchStickersSuccess = (stickers) => ({
  type: FETCH_STICKERS_SUCCESS,
  stickers
})

export const fetchStickersFailure = () => ({
  type: FETCH_STICKERS_FAILURE
})

export const fetchStickerRequest = () => ({
  type: FETCH_STICKER_REQUEST
})

export const fetchStickerSuccess = (sticker) => ({
  type: FETCH_STICKER_SUCCESS,
  sticker
})

export const fetchStickerFailure = () => ({
  type: FETCH_STICKER_FAILURE
})

export const fetchStickers = ( pack_id ) => async(dispatch, getState) => {
  try {
    const prefix = 'sticker:' + pack_id.substring(13) + ':'
    dispatch(fetchStickersRequest())
    const result = await contentDB.allDocs({
      startkey: prefix, 
      endkey: prefix +'\ufff0', 
      include_docs: true})
    console.log(result)
    dispatch(fetchStickersSuccess(result.rows.map(function(row) { return row.doc})))
  } catch(error) {
      console.log('fetchStickers: ' + error)
      dispatch(fetchStickersFailure())
  }
}

export const fetchSticker = ( sticker_id ) => async(dispatch, getState) => {
  try {
    dispatch(fetchStickerRequest())
    const sticker = await contentDB.get(sticker_id)
    console.log(sticker)
    dispatch(fetchStickerSuccess(sticker))
  } catch(error) {
      console.log('fetchSticker: ' + error)
      dispatch(fetchStickerFailure())
  }
}

export const fetchStickerPacks = () => async(dispatch, getState) => {
  try {
    dispatch(fetchStickerPacksRequest())
    const result = await contentDB.allDocs({
      startkey: 'sticker-pack:', 
      endkey: 'sticker-pack:' +'\ufff0', 
      include_docs: true})
    console.log(result)
    dispatch(fetchStickerPacksSuccess(result.rows.map(function(row) { return row.doc})))
  } catch(error) {
      console.log('fetchStickers: ' + error)
      dispatch(fetchStickerPacksFailure())
  }
}

export default reducer