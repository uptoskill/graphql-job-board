const db = require('./db');

// RESOLVER SCHEMA DEFINES HOW THE QUERIES RESOLVE THE DATA
const Query = {
  greeting: () => 'Hello World',
  // job: (root, args) => db.jobs.get(args.id),
  // Here the resolver uses destructuring to grab the id from the args
  job: (root, { id }) => db.jobs.get(id),
  jobs: () => db.jobs.list(),
  company: (root, { id }) => db.companies.get(id),
  companies: () => db.companies.list(),
};

const Job = {
  company: (job) => db.companies.get(job.companyId),
};

// const Mutation = {
//   createJob: (root, { companyId, title, description }) => {
//     const id =  db.jobs.create({ companyId, title, description });
//     return db.jobs.get(id)
//   },
// };

const Mutation = {
  createJob: (root, { input }) => {
    const id = db.jobs.create(input);
    return db.jobs.get(id);
  },
};

const Company = {
  jobs: (company) => db.jobs.list().filter((job) => job.companyId === company.id),
};

module.exports = { Query, Mutation, Job, Company };
