const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();
// const { ApolloServer, gql } = require('apollo-server-express');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const server = new ApolloServer({
//   typeDefs: gql`
//     type Query {
//       hello: String
//     }
//   `,
//   resolvers: {
//     Query: {
//       hello: () => 'Hello world!',
//     },
//   },
// });

// server.applyMiddleware({ app });

app.use('/', router);
// to only run build and get static when in production, not development
app.use('/build', express.static(path.join(__dirname, '../build')));
// serves homepage
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
);
// catch all route handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});
// global error handler
app.use((err, req, res, next) => {
  console.log('error handler', err);
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
