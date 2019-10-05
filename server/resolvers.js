const db = require('./db');

const Query = {
  company: (root, {id}) => db.companies.get(id),
  job: (root, {id}) => db.jobs.get(id),
  jobs: () => db.jobs.list()
};

const Mutation = {
  createJob: (root, {companyId, title, description}) => {
    return db.jobs.create({companyId, title, description});
  }
};

const Company = {
  jobs: (company) => db.jobs.list()
    .filter((job) => job.companyId === company.id)
};

const Job = {
  company: (job) => db.companies.get(job.companyId)
};

module.exports = { Query, Mutation, Company, Job };
