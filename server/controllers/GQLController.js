const { createTypes, createResolvers } = require('../GQLFactory/schemaFactory');
const { makeExecutableSchema } = require('graphql-tools');

const GQLController = {};

GQLController.createGQLSchema = (req, res, next) => {
  const { SQLSchema, PSQLURI } = res.locals;

  try {
    const { types, typeDefs } = createTypes(SQLSchema);
    // let { resolvers, resolversObject } = createResolvers(SQLSchema);
    const { mirrorResolvers, resolversObject } = createResolvers(
      SQLSchema,
      PSQLURI
    );
    res.locals.GQLSchema = { types, mirrorResolvers };

    const resolvers = resolversObject;

    res.locals.GQLSchema.graphiqlSchema = makeExecutableSchema({
      typeDefs,
      resolvers,
      allowUndefinedInResolve: false,
    });

    // console.log('RES.LOCALS.EXECUTEDSCHEMA: ', res.locals.executedSchema);
    return next();
  } catch (err) {
    const errObject = {
      log: `Error in createGQLSchema: ${err}`,
      status: 400,
      message: {
        err: 'Unable to create GQL schema',
      },
    };
    return next(errObject);
  }
};

/* GQLController.createGQLServer = (req, res, next) => {
  const PG_URI = req.body.link;
  const { typeDefs, resolvers } = res.locals.GQLSchema;
  const pool = new Pool({
    connectionString: PG_URI,
  });
  const schema = makeExecutableSchema({ typeDefs, resolvers });

}; */

module.exports = GQLController;
