import { useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { createJobMutation } from './graphql';

const JobForm = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addJob, { loading, error, data }] = useMutation(createJobMutation, {
    onCompleted: ({ job }) => props.history.push('/jobs/' + job.id),
  });
  if (error) return `Error! ${error.message}`;
  const handleClick = async event => {
    event.preventDefault();
    await addJob({ variables: { input: { title, description } } });
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea
                className="input"
                style={{ height: '10em' }}
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-link" onClick={handleClick}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
