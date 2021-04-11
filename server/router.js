const express = require('express');
const router = express.Router();
const { graphqlHTTP } = require('express-graphql');
const {
  getSQLSchema,
  formatGraphData,
} = require('./controllers/SQLController');
const { createGQLSchema } = require('./controllers/GQLController');

/* Route for example SQL Schema and example GQL Schema */
router.get(
  '/example-schema',
  getSQLSchema,
  createGQLSchema,
  formatGraphData,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

/* Route for example SQL Schema */
router.get('/example-schema-json', getSQLSchema, (req, res) => {
  res.status(200).json(res.locals.SQLSchema);
});

/* Route to get user db schema */
router.post(
  '/sql-schema',
  getSQLSchema,
  createGQLSchema,
  formatGraphData,
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

// route to graphiql playground **middleware to be changed
router.use(
  '/graphiql',
  getSQLSchema,
  createGQLSchema,
  graphqlHTTP((req, res) => ({
    schema: res.locals.GQLSchema.graphiqlSchema,
    graphiql: true,
  }))
);

// router.use(
//   '/graphiql',
//   graphqlHTTP((req, res) => ({
//     schema: req.body,
//     graphiql: true,
//   }))
// );

/* Route to get user (table specific) GraphQL Schema and Resolvers */
// router.post('gql-schema', GQLController.createGQLSchema,
// (req, res) => {res.status(200).json(res.locals.GQLSchema)
// });

module.exports = router;
