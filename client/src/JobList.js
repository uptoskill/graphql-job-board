import React from 'react';
import { Link } from 'react-router-dom';

const JobList = props => {
  const { jobs } = props;

  const renderJob = job => {
    const title = job.company ? `${job.title} at ${job.company.name}` : job.title;
    return (
      <li className="media" key={job.id}>
        <div className="media-content">
          <Link to={`/jobs/${job.id}`}>{title}</Link>
        </div>
      </li>
    );
  };

  return <ul className="box"> {jobs.map(job => renderJob(job))} </ul>;
};

export default JobList;
