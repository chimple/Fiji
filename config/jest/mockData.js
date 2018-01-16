const contentJson = require('../../__tests__/seed/content.json')
const usersJson = require('../../__tests__/seed/users.json')


export const titles = contentJson['docs'].filter(function (doc) {
  return doc._id.startsWith('storytitle:')
})

export const stories = contentJson['docs'].filter(function (doc) {
  return doc._id.startsWith('story:')
})

export const games = contentJson['docs'].filter(function (doc) {
  return doc._id.startsWith('game:')
})

export const story_alice_in_wonderland = contentJson['docs'].filter(function (doc) {
  return doc._id == 'story:alice-in-wonderland'
})[0]

export const users = usersJson['docs']