const db = require('./db');

// RESOLVER SCHEMA DEFINES HOW THE QUERIES RESOLVE THE DATA
const Query = {
  greeting: () => 'Hello World',
  // job: (root, args) => db.jobs.get(args.id),
  // Here the resolver uses destructuring to grab the id from the args
  job: (root, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list(),
  companies: () => db.companies.list(),
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

module.exports = { Query, Job };
