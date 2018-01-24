import { fetchUsersFailure } from '../../app/redux/users';

const contentJson = require('../../__tests__/seed/content.json')
const usersJson = require('../../__tests__/seed/users.json')
const userAliceJson = require('../../__tests__/seed/user_alice.json')


export const titles = contentJson['docs'].filter(function (doc) {
  return doc._id.startsWith('storytitle:')
})

export const stories = contentJson['docs'].filter(function (doc) {
  return doc._id.startsWith('story:')
})

export const games = contentJson['docs'].filter(function (doc) {
  return doc._id.startsWith('game:')
})

export const gameThemeData = contentJson['docs'].filter(function (doc) {
  return doc._id.startsWith('gametheme:')
})

export const stickersData = contentJson['docs'].filter(function (doc) {
  return doc._id.startsWith('sticker:caterpillar:')
})

export const stickerPacksData = contentJson['docs'].filter(function (doc) {
  return doc._id.startsWith('sticker-pack:')
})

export const story_alice_in_wonderland = contentJson['docs'].filter(function (doc) {
  return doc._id == 'story:alice-in-wonderland'
})[0]

export const users = usersJson['docs']

export const messages = userAliceJson['docs'].filter(function(doc) {
  return doc._id.startsWith('chat:mad-hatter:')
})