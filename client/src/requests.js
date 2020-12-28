const endpointURL = 'http://localhost:9000/graphql';

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const responseBody = await response.json();
  if (responseBody.errors) {
    const message = responseBody.errors.map((error) => error.message).join('\n');
    throw new Error(message);
  }
  return responseBody.data;
}

export async function loadJobs() {
  const query = `{
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }`;

  const { jobs } = await graphqlRequest(query, {});

  return jobs;
}

export async function loadJob(id) {
  const query = `query JobQuery($id: ID!){
    job(id:$id) {
      id
      title
      company {
        id
        name
      }
      description
    }
}`;
  const { job } = await graphqlRequest(query, { id });
  return job;
}

// export async function loadJob(id) {
//   const response = await fetch(endpointURL, {
//     method: 'POST',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify({
//       query: `query JobQuery($id: ID!){
//                 job(id:$id) {
//                   id
//                   title
//                   company {
//                     id
//                     name
//                   }
//                   description
//                 }
//             }`,
//       variables: { id },
//     }),
//   });

//   const responseBody = await response.json();
//   return responseBody.data.job;
// }

// export async function loadJobs() {
//   const response = await fetch(endpointURL, {
//     method: 'POST',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify({
//       query: `{
//         jobs {
//           id
//           title
//           company {
//             id
//             name
//           }
//         }
//       }`,
//     }),
//   });

//   const responseBody = await response.json();
//   console.log('BODY', responseBody.data);
//   return responseBody.data.jobs;
// }
