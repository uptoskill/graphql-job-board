import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { JobList } from './JobList';
import { companyQuery } from './graphql';

const CompanyDetail = props => {
  const { companyId } = props.match.params;
  const { loading, error, data } = useQuery(companyQuery, {
    variables: { id: companyId },
  });
  if (loading) return <Fragment />;
  if (error) return `Error! ${error.message}`;
  const company = data ? data.company : null;

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h5 className="title is-5">Jobs at {company.name}</h5>
      <JobList jobs={company.jobs} />
    </div>
  );
};

export default CompanyDetail;
