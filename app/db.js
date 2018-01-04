import PouchDB from 'pouchdb-react-native';

// these settings let us use cuids
// see: https://github.com/ericelliott/cuid/issues/54
global.navigator.mimeTypes = '';
global.navigator.userAgent = 'reactnative';    

const fijiDB = new PouchDB('fiji', { adapter: 'asyncstorage' });

export default fijiDB