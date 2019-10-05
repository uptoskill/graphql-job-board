const db = require('./db');

const Query = {
  jobs: () => db.jobs.list()
};

const Job = {
  company: (job) => db.companies.get(job.companyId)
};

module.exports = { Query, Job };
