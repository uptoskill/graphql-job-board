import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { jobQuery } from './graphql';

const JobDetail = props => {
  const { jobId } = props.match.params;
  const { loading, error, data } = useQuery(jobQuery, {
    fetchPolicy: 'no-cache',
    variables: { id: jobId },
  });
  if (loading) return <Fragment />;
  if (error) return `Error! ${error.message}`;
  const job = data ? data.job : null;

  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
};

export default JobDetail;
