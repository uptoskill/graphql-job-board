import React, { Component } from 'react';
import { JobList } from './JobList';
const { jobs } = require('./fake-data');

export class JobBoard extends Component {
  render() {
    return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={jobs} />
      </div>
    );
  }
}
