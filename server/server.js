// Node FileSystem Module
const fs = require('fs');
// ApolloServer requirements and the gql function to parse gql schemas
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const port = 9000;
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();
app.use(
  cors(),
  express.json(),
  expressJwt({
    secret: jwtSecret,
    credentialsRequired: false,
  })
);

// because we want to write are gql schemas in seperate file we use filesync
// pass in the schema and the encoding type so it is passed as a string and not binary
const typeDefs = gql(fs.readFileSync('./schema.graphql', { encoding: 'utf8' }));
const resolvers = require('./resolvers');
// Creates an instance of ApolloServer we pass the typeDefs and resolvers
const apolloServer = new ApolloServer({ typeDefs, resolvers });
// middleware used to inject the graphql in an express server
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({ sub: user.id }, jwtSecret);
  res.send({ token });
});

app.listen(port, () => console.info(`Server started on port ${port}`));
