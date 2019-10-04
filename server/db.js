const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
  companies: store.collection('companies'),
  jobs: store.collection('jobs'),
  users: store.collection('users')
};
