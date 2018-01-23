jest.mock('../../db')

import { contentDB } from '../../db'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import sticker, {
  initialState,
  fetchStickersFailure,
  fetchStickersRequest,
  fetchStickersSuccess,
  fetchStickers,
  fetchStickerFailure,
  fetchStickerRequest,
  fetchStickerSuccess,
  fetchSticker,
  fetchStickerPacksFailure,
  fetchStickerPacksRequest,
  fetchStickerPacksSuccess,
  fetchStickerPacks,
} from '../sticker'
import { stickersData, stickerPacksData } from '../../../config/jest/mockData'

// test reducers

it('returns the same state on an unhandled action', () => {
  expect(sticker(initialState, { type: '_NULL' })).toMatchSnapshot()
})

it('handles FETCH_STICKERS_REQUEST action', () => {
  expect(sticker(initialState, fetchStickersRequest())).toMatchSnapshot()
})

it('handles FETCH_STICKERS_SUCCESS action', () => {
  expect(sticker(initialState, fetchStickersSuccess(stickersData))).toMatchSnapshot()
})

it('handles FETCH_STICKERS_FAILURE action', () => {
  expect(sticker(initialState, fetchStickersFailure())).toMatchSnapshot()
})

it('handles FETCH_STICKER_REQUEST action', () => {
  expect(sticker(initialState, fetchStickerRequest())).toMatchSnapshot()
})

it('handles FETCH_STICKER_SUCCESS action', () => {
  expect(sticker(initialState, fetchStickerSuccess(stickersData[0]))).toMatchSnapshot()
})

it('handles FETCH_STICKER_FAILURE action', () => {
  expect(sticker(initialState, fetchStickerFailure())).toMatchSnapshot()
})

it('handles FETCH_STICKER_PACKS_REQUEST action', () => {
  expect(sticker(initialState, fetchStickerPacksRequest())).toMatchSnapshot()
})

it('handles FETCH_STICKER_PACKS_SUCCESS action', () => {
  expect(sticker(initialState, fetchStickerPacksSuccess(stickersData))).toMatchSnapshot()
})

it('handles FETCH_STICKER_PACKS_FAILURE action', () => {
  expect(sticker(initialState, fetchStickerPacksFailure())).toMatchSnapshot()
})

// test actions

it('creates a FETCH_STICKERS_REQUEST action', () => {
  expect(fetchStickersRequest()).toMatchSnapshot()
})

it('creates a FETCH_STICKERS_SUCCESS action', () => {
  expect(fetchStickersSuccess(stickersData)).toMatchSnapshot()
})

it('creates a FETCH_STICKERS_FAILURE action', () => {
  expect(fetchStickersFailure()).toMatchSnapshot()
})

it('creates a FETCH_STICKER_REQUEST action', () => {
  expect(fetchStickerRequest()).toMatchSnapshot()
})

it('creates a FETCH_STICKER_SUCCESS action', () => {
  expect(fetchStickerSuccess(stickersData[0])).toMatchSnapshot()
})

it('creates a FETCH_STICKER_FAILURE action', () => {
  expect(fetchStickerFailure()).toMatchSnapshot()
})

it('creates a FETCH_STICKER_PACKS_REQUEST action', () => {
  expect(fetchStickerPacksRequest()).toMatchSnapshot()
})

it('creates a FETCH_STICKER_PACKS_SUCCESS action', () => {
  expect(fetchStickerPacksSuccess(stickerPacksData)).toMatchSnapshot()
})

it('creates a FETCH_STICKER_PACKS_FAILURE action', () => {
  expect(fetchStickerPacksFailure()).toMatchSnapshot()
})

// test thunks

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

it('handles fetchStickers action', async () => {
  const store = mockStore(initialState)
  contentDB.allDocs = jest.fn()
    .mockReturnValue({
      rows: stickersData.map(function (doc) {
        return { doc }
      })
    })
  await store.dispatch(fetchStickers('sticker-pack:caterpillar'))
  expect(store.getActions()).toMatchSnapshot()
})  

it('handles fetchSticker action', async () => {
  const store = mockStore(initialState)
  contentDB.get = jest.fn()
    .mockReturnValue(stickersData[0])
  await store.dispatch(fetchSticker(stickerPacksData[0]._id))
  expect(store.getActions()).toMatchSnapshot()
})  

it('handles fetchStickerPacks action', async () => {
  const store = mockStore(initialState)
  contentDB.allDocs = jest.fn()
    .mockReturnValue({
      rows: stickerPacksData.map(function (doc) {
        return { doc }
      })
    })
  await store.dispatch(fetchStickerPacks())
  expect(store.getActions()).toMatchSnapshot()
})  
