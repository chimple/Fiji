import PouchDB from 'pouchdb-react-native';

// these settings let us use cuids
// see: https://github.com/ericelliott/cuid/issues/54
// global.navigator.mimeTypes = '';
// global.navigator.userAgent = 'reactnative';    

// const db = new PouchDB('http://localhost:5984/chat')
// console.log(db.adapter)
// db.info().then(function (info) {
//   console.log(info)
// })

// db.allDocs({include_docs: true}).then(function(result) {
//   console.log(result)
// }).catch(function (err) {
//   console.log(err)
// })

// var attachment = new Blob(['Is there life on Mars?'], {type: 'text/plain'})
// db.putAttachment('doc', 'att.txt', attachment, 'text/plain').then(function (result) {
//   db.get('doc', {attachments: true}).then(function (doc) {
//     console.log(doc)
//   })
// }).catch(function (err) {
//   console.log(err);
// })

 //localhost:5984 to run in local server

const remoteURL = 'https://057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix:c497d04cafd1d098f244dcec455c1468cdf324a223da49e1f9f34a16f7d235f5@057d4c76-09e0-4f8d-b78d-7d61021e406c-bluemix.cloudant.com/'
//  const remoteURL = 'http://localhost:5984/'


const usersDB = new PouchDB('users')
const remoteUsersDB = new PouchDB(remoteURL + 'users')
const contentDB = new PouchDB('content')
const remoteContentDB = new PouchDB(remoteURL + 'content')

contentDB.replicate.from(remoteContentDB).then(function (result) {
  console.log("contentDB replication")
  console.log(result)
}).catch(function (err) {
  console.log("contentDB replication error")
  console.log(err)
}) 

export { usersDB, remoteUsersDB, contentDB, remoteContentDB, remoteURL }
