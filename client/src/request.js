import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import gql from 'graphql-tag';
import { isLoggedIn, getAccessToken } from './auth';
const endPointURL = 'http://localhost:9000/graphql';

const authLink = new ApolloLink((operation, forward) => {
  if (isLoggedIn()) {
    //request.headers['authorization'] = 'Bearer ' + getAccessToken();
    operation.setContext({
      headers: {
        authorization: 'Bearer ' + getAccessToken(),
      },
    });
  }
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, new HttpLink({ uri: endPointURL })]),
  cache: new InMemoryCache(),
});
/*
async function graphqlRequest(query, variables = {}) {
  const request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  };
  if (isLoggedIn()) {
    request.headers['authorization'] = 'Bearer ' + getAccessToken();
  }
  const response = await fetch(endPointURL, request);
  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors.map(err => err.message).join('\n');
    throw new Error(message);
  }
  return responseBody.data;
} */
const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    title
    description
    company {
      id
      name
    }
  }
`;
const jobsQuery = gql`
  query JobsQuery {
    jobs {
      id
      title
      description
      company {
        id
        name
        description
      }
    }
  }
`;

const jobQuery = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

const createJobMutation = gql`
  mutation CreateJob($input: CreateJobInput) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

const companyQuery = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
      }
    }
  }
`;

export async function loadJob(id) {
  //const { job } = await graphqlRequest(query, { id });
  const {
    data: { job },
  } = await client.query({ query: jobQuery, variables: { id } });
  return job;
}

export async function loadJobs() {
  //const { jobs } = await graphqlRequest(query);
  //using apollo-client
  const {
    data: { jobs },
  } = await client.query({ query: jobsQuery, fetchPolicy: 'no-cache' });
  return jobs;
}

export async function loadCompany(id) {
  //const { company } = await graphqlRequest(query, { id });
  const {
    data: { company },
  } = await client.query({ query: companyQuery, variables: { id } });
  return company;
}

export async function createJob(input) {
  //const { job } = await graphqlRequest(mutation, { input });
  const {
    data: { job },
  } = await client.mutate({
    mutation: createJobMutation,
    variables: { input },
    update: (cache, { data }) => {
      //cache the load job query when new job is created to avaoid multiple graphql requests
      cache.writeQuery({ query: jobQuery, variables: { id: data.job.id }, data });
    },
  });
  return job;
}
