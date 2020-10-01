import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { JobList } from './JobList';
import { jobsQuery } from './graphql';

const JobBoard = () => {
  const { loading, error, data } = useQuery(jobsQuery, { fetchPolicy: 'no-cache' });
  if (loading) return <Fragment />;
  if (error) return `Error! ${error.message}`;
  const jobs = data ? data.jobs : [];

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
};

export default JobBoard;
