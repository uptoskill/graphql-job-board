import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { jobs } from './fake-data';

export class JobDetail extends Component {
  constructor(props) {
    super(props);
    const {jobId} = this.props.match.params;
    this.state = {job: jobs.find((job) => job.id === jobId)};
  }

  render() {
    const {job} = this.state;
    return (
      <div>
        <h1 className="title">{job.title}</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className="box">{job.description}</div>
      </div>
    );
  }
}
