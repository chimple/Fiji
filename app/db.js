import PouchDB from 'pouchdb-react-native';

// these settings let us use cuids
// see: https://github.com/ericelliott/cuid/issues/54
global.navigator.mimeTypes = '';
global.navigator.userAgent = 'reactnative';    

const fijiDB = new PouchDB('fiji', { adapter: 'asyncstorage' });
console.log(fijiDB.adapter)
fijiDB.info().then(function (info) {
  console.log(info);
})
export default fijiDB