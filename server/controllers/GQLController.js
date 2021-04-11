const { createTypes, createResolvers } = require('../GQLFactory/schemaFactory');
const GQLController = {};
const { makeExecutableSchema } = require('graphql-tools');
const { Pool } = require('pg');

GQLController.createGQLSchema = (req, res, next) => {
  const { SQLSchema } = res.locals;
  try {
    const { types, typeDefs } = createTypes(SQLSchema);
    // const { types } = createTypes(SQLSchema);
    // let { resolvers } = createResolvers(SQLSchema);
    // let { resolvers, resolversObject } = createResolvers(SQLSchema);
    const { resolversObject } = createResolvers(SQLSchema);
    const resolvers = resolversObject;
    // res.locals.GQLSchema = { types, resolvers };

    // console.log(resolvers);

    // console.log(resolversObj);
    // const result = eval(resolversObj);
    // console.log(result);

    // console.log(typeof looseJsonParse(resolversObj));

    // res.locals.executableSchema = { typeDefs, resolversObject };
    // console.log(resolversObject);
    // res.locals.executableSchema = resolversObject;
    // console.log(res.locals.executableSchema.Query);

    // const pool = new Pool({
    //   connectionString: res.locals.PSQLURI,
    // });

    // const db = {};
    // db.query = (text, params, callback) => {
    //   console.log('executed query:', text);
    //   return pool.query(text, params, callback);
    // };

    //
    // function looseJsonParse(obj, pool) {
    //   // const pool = new Pool({
    //   //   connectionString: res.locals.PSQLURI,
    //   // });

    //   const db = {};
    //   db.query = (text, params, callback) => {
    //     console.log('executed query:', text);
    //     return pool.query(text, params, callback);
    //   };

    //   const result = Function('"use strict";return (' + obj + ')');
    //   return result();
    // }

    // const resolversObj = resolvers.substring(19);
    // const resolversObjectClean = looseJsonParse(resolversObj, pool);

    // console.log(resolversObjectClean.Query.person(null, 1));

    // console.log(resolversObjectClean);
    // console.log(resolversObjectClean.Query.person.toString());

    // console.log(resolversTest.Query.person(null, 1));

    // res.locals.executedSchema = makeExecutableSchema({
    //   typeDefs,
    //   // resolversObject,
    //   resolversTest,
    //   allowUndefinedInResolve: false,
    //   // resolverValidationOptions: { requireResolversForArgs: 'error' },
    //   // requireResolversForAllFields: 'warn',
    // });
    // const PG_URI =
    //   'postgres://sugmjzbp:wvcZ6SvHu61w8qdmDYBb1uvdnqtLZ_82@suleiman.db.elephantsql.com:5432/sugmjzbp';

    // const pool = new Pool({
    //   connectionString: PG_URI,
    // });

    // const db = {};
    // db.query = (text, params, callback) => {
    //   console.log('executed query:', text);
    //   return pool.query(text, params, callback);
    // };

    // function looseJsonParse(obj, pool) {
    //   const db = {};
    //   db.query = (text, params, callback) => {
    //     console.log('executed query:', text);
    //     return pool.query(text, params, callback);
    //   };

    //   const result = Function('"use strict";return (' + obj + ')');
    //   result.prototype.db;

    //   return result();
    // }

    // const resolversObj = resolvers.substring(19);
    // const resolversObjectClean = looseJsonParse(resolversObj, pool);
    // resolvers = resolversObjectClean;

    // OUR RESOLVER HARDCODED
    // const resolversd = {
    //   Query: {
    //     person: (parent, args) => {
    //       const query = 'SELECT * FROM people WHERE _id = $1';
    //       const values = [args._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     people: () => {
    //       const query = 'SELECT * FROM people';
    //       return db
    //         .query(query)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },

    //     film: (parent, args) => {
    //       const query = 'SELECT * FROM films WHERE _id = $1';
    //       const values = [args._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     films: () => {
    //       const query = 'SELECT * FROM films';
    //       return db
    //         .query(query)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },

    //     planet: (parent, args) => {
    //       const query = 'SELECT * FROM planets WHERE _id = $1';
    //       const values = [args._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     planets: () => {
    //       const query = 'SELECT * FROM planets';
    //       return db
    //         .query(query)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },

    //     speciesById: (parent, args) => {
    //       const query = 'SELECT * FROM species WHERE _id = $1';
    //       const values = [args._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     species: () => {
    //       const query = 'SELECT * FROM species';
    //       return db
    //         .query(query)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },

    //     vessel: (parent, args) => {
    //       const query = 'SELECT * FROM vessels WHERE _id = $1';
    //       const values = [args._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     vessels: () => {
    //       const query = 'SELECT * FROM vessels';
    //       return db
    //         .query(query)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },

    //     starshipSpec: (parent, args) => {
    //       const query = 'SELECT * FROM starship_specs WHERE _id = $1';
    //       const values = [args._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     starshipSpecs: () => {
    //       const query = 'SELECT * FROM starship_specs';
    //       return db
    //         .query(query)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //   },

    //   Mutation: {
    //     addPerson: (parent, args) => {
    //       const query =
    //         'INSERT INTO people (gender, species_id, homeworld_id, height, mass, hair_color, skin_color, eye_color, name, birth_year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    //       const values = [
    //         args.gender,
    //         args.species_id,
    //         args.homeworld_id,
    //         args.height,
    //         args.mass,
    //         args.hair_color,
    //         args.skin_color,
    //         args.eye_color,
    //         args.name,
    //         args.birth_year,
    //       ];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     updatePerson: (parent, args) => {
    //       const query =
    //         'UPDATE people SET gender = $1, species_id = $2, homeworld_id = $3, height = $4, mass = $5, hair_color = $6, skin_color = $7, eye_color = $8, name = $9, birth_year = $10 WHERE _id = $11 RETURNING *';
    //       const values = [
    //         args.gender,
    //         args.species_id,
    //         args.homeworld_id,
    //         args.height,
    //         args.mass,
    //         args.hair_color,
    //         args.skin_color,
    //         args.eye_color,
    //         args.name,
    //         args.birth_year,
    //         args._id,
    //       ];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     deletePerson: (parent, args) => {
    //       const query = 'DELETE FROM people WHERE _id = $1 RETURNING *';
    //       const values = [args._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     addFilm: (parent, args) => {
    //       const query =
    //         'INSERT INTO films (director, opening_crawl, episode_id, title, release_date, producer) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    //       const values = [
    //         args.director,
    //         args.opening_crawl,
    //         args.episode_id,
    //         args.title,
    //         args.release_date,
    //         args.producer,
    //       ];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     updateFilm: (parent, args) => {
    //       const query =
    //         'UPDATE films SET director = $1, opening_crawl = $2, episode_id = $3, title = $4, release_date = $5, producer = $6 WHERE _id = $7 RETURNING *';
    //       const values = [
    //         args.director,
    //         args.opening_crawl,
    //         args.episode_id,
    //         args.title,
    //         args.release_date,
    //         args.producer,
    //         args._id,
    //       ];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     deleteFilm: (parent, args) => {
    //       const query = 'DELETE FROM films WHERE _id = $1 RETURNING *';
    //       const values = [args._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     addPlanet: (parent, args) => {
    //       const query =
    //         'INSERT INTO planets (orbital_period, climate, gravity, terrain, surface_water, population, name, rotation_period, diameter) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    //       const values = [
    //         args.orbital_period,
    //         args.climate,
    //         args.gravity,
    //         args.terrain,
    //         args.surface_water,
    //         args.population,
    //         args.name,
    //         args.rotation_period,
    //         args.diameter,
    //       ];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     updatePlanet: (parent, args) => {
    //       const query =
    //         'UPDATE planets SET orbital_period = $1, climate = $2, gravity = $3, terrain = $4, surface_water = $5, population = $6, name = $7, rotation_period = $8, diameter = $9 WHERE _id = $10 RETURNING *';
    //       const values = [
    //         args.orbital_period,
    //         args.climate,
    //         args.gravity,
    //         args.terrain,
    //         args.surface_water,
    //         args.population,
    //         args.name,
    //         args.rotation_period,
    //         args.diameter,
    //         args._id,
    //       ];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     deletePlanet: (parent, args) => {
    //       const query = 'DELETE FROM planets WHERE _id = $1 RETURNING *';
    //       const values = [args._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     addSpecies: (parent, args) => {
    //       const query =
    //         'INSERT INTO species (hair_colors, name, classification, average_height, average_lifespan, skin_colors, eye_colors, language, homeworld_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    //       const values = [
    //         args.hair_colors,
    //         args.name,
    //         args.classification,
    //         args.average_height,
    //         args.average_lifespan,
    //         args.skin_colors,
    //         args.eye_colors,
    //         args.language,
    //         args.homeworld_id,
    //       ];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     updateSpecies: (parent, args) => {
    //       const query =
    //         'UPDATE species SET hair_colors = $1, name = $2, classification = $3, average_height = $4, average_lifespan = $5, skin_colors = $6, eye_colors = $7, language = $8, homeworld_id = $9 WHERE _id = $10 RETURNING *';
    //       const values = [
    //         args.hair_colors,
    //         args.name,
    //         args.classification,
    //         args.average_height,
    //         args.average_lifespan,
    //         args.skin_colors,
    //         args.eye_colors,
    //         args.language,
    //         args.homeworld_id,
    //         args._id,
    //       ];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     deleteSpecies: (parent, args) => {
    //       const query = 'DELETE FROM species WHERE _id = $1 RETURNING *';
    //       const values = [args._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     addVessel: (parent, args) => {
    //       const query =
    //         'INSERT INTO vessels (cost_in_credits, length, vessel_type, model, manufacturer, name, vessel_class, max_atmosphering_speed, crew, passengers, cargo_capacity, consumables) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *';
    //       const values = [
    //         args.cost_in_credits,
    //         args.length,
    //         args.vessel_type,
    //         args.model,
    //         args.manufacturer,
    //         args.name,
    //         args.vessel_class,
    //         args.max_atmosphering_speed,
    //         args.crew,
    //         args.passengers,
    //         args.cargo_capacity,
    //         args.consumables,
    //       ];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     updateVessel: (parent, args) => {
    //       const query =
    //         'UPDATE vessels SET cost_in_credits = $1, length = $2, vessel_type = $3, model = $4, manufacturer = $5, name = $6, vessel_class = $7, max_atmosphering_speed = $8, crew = $9, passengers = $10, cargo_capacity = $11, consumables = $12 WHERE _id = $13 RETURNING *';
    //       const values = [
    //         args.cost_in_credits,
    //         args.length,
    //         args.vessel_type,
    //         args.model,
    //         args.manufacturer,
    //         args.name,
    //         args.vessel_class,
    //         args.max_atmosphering_speed,
    //         args.crew,
    //         args.passengers,
    //         args.cargo_capacity,
    //         args.consumables,
    //         args._id,
    //       ];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     deleteVessel: (parent, args) => {
    //       const query = 'DELETE FROM vessels WHERE _id = $1 RETURNING *';
    //       const values = [args._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     addStarshipSpec: (parent, args) => {
    //       const query =
    //         'INSERT INTO starship_specs (vessel_id, MGLT, hyperdrive_rating) VALUES ($1, $2, $3) RETURNING *';
    //       const values = [args.vessel_id, args.MGLT, args.hyperdrive_rating];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     updateStarshipSpec: (parent, args) => {
    //       const query =
    //         'UPDATE starship_specs SET vessel_id = $1, MGLT = $2, hyperdrive_rating = $3 WHERE _id = $4 RETURNING *';
    //       const values = [
    //         args.vessel_id,
    //         args.MGLT,
    //         args.hyperdrive_rating,
    //         args._id,
    //       ];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },

    //     deleteStarshipSpec: (parent, args) => {
    //       const query = 'DELETE FROM starship_specs WHERE _id = $1 RETURNING *';
    //       const values = [args._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows[0])
    //         .catch((err) => new Error(err));
    //     },
    //   },

    //   Person: {
    //     films: (people) => {
    //       const query =
    //         'SELECT * FROM films LEFT OUTER JOIN people_in_films ON films._id = people_in_films.film_id WHERE people_in_films.person_id = $1';
    //       const values = [people._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //     species: (people) => {
    //       const query =
    //         'SELECT species.* FROM species LEFT OUTER JOIN people ON species._id = people.species_id WHERE people._id = $1';
    //       const values = [people._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //     planets: (people) => {
    //       const query =
    //         'SELECT planets.* FROM planets LEFT OUTER JOIN people ON planets._id = people.homeworld_id WHERE people._id = $1';
    //       const values = [people._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //     vessels: (people) => {
    //       const query =
    //         'SELECT * FROM vessels LEFT OUTER JOIN pilots ON vessels._id = pilots.vessel_id WHERE pilots.person_id = $1';
    //       const values = [people._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //   },

    //   Film: {
    //     planets: (films) => {
    //       const query =
    //         'SELECT * FROM planets LEFT OUTER JOIN planets_in_films ON planets._id = planets_in_films.planet_id WHERE planets_in_films.film_id = $1';
    //       const values = [films._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //     people: (films) => {
    //       const query =
    //         'SELECT * FROM people LEFT OUTER JOIN people_in_films ON people._id = people_in_films.person_id WHERE people_in_films.film_id = $1';
    //       const values = [films._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //     vessels: (films) => {
    //       const query =
    //         'SELECT * FROM vessels LEFT OUTER JOIN vessels_in_films ON vessels._id = vessels_in_films.vessel_id WHERE vessels_in_films.film_id = $1';
    //       const values = [films._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //     species: (films) => {
    //       const query =
    //         'SELECT * FROM species LEFT OUTER JOIN species_in_films ON species._id = species_in_films.species_id WHERE species_in_films.film_id = $1';
    //       const values = [films._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //   },

    //   Planet: {
    //     films: (planets) => {
    //       const query =
    //         'SELECT * FROM films LEFT OUTER JOIN planets_in_films ON films._id = planets_in_films.film_id WHERE planets_in_films.planet_id = $1';
    //       const values = [planets._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //     species: (planets) => {
    //       const query = 'SELECT * FROM species WHERE homeworld_id = $1';
    //       const values = [planets._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //     people: (planets) => {
    //       const query = 'SELECT * FROM people WHERE homeworld_id = $1';
    //       const values = [planets._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //   },

    //   Species: {
    //     people: (species) => {
    //       const query = 'SELECT * FROM people WHERE species_id = $1';
    //       const values = [species._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //     planets: (species) => {
    //       const query =
    //         'SELECT planets.* FROM planets LEFT OUTER JOIN species ON planets._id = species.homeworld_id WHERE species._id = $1';
    //       const values = [species._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //     films: (species) => {
    //       const query =
    //         'SELECT * FROM films LEFT OUTER JOIN species_in_films ON films._id = species_in_films.film_id WHERE species_in_films.species_id = $1';
    //       const values = [species._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //   },

    //   Vessel: {
    //     films: (vessels) => {
    //       const query =
    //         'SELECT * FROM films LEFT OUTER JOIN vessels_in_films ON films._id = vessels_in_films.film_id WHERE vessels_in_films.vessel_id = $1';
    //       const values = [vessels._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //     people: (vessels) => {
    //       const query =
    //         'SELECT * FROM people LEFT OUTER JOIN pilots ON people._id = pilots.person_id WHERE pilots.vessel_id = $1';
    //       const values = [vessels._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //     starshipSpecs: (vessels) => {
    //       const query = 'SELECT * FROM starship_specs WHERE vessel_id = $1';
    //       const values = [vessels._id];
    //       return db
    //         .query(query, values)
    //         .then((data) => data.rows)
    //         .catch((err) => new Error(err));
    //     },
    //   },
    // };
    // console.log(resolvers.Query.person(null, 1));
    // console.log(resolversObject.Query.people());
    // const resolvers = resolversObject;

    res.locals.executedSchema = makeExecutableSchema({
      typeDefs,
      // resolversObject,
      resolvers,
      allowUndefinedInResolve: false,
      // resolverValidationOptions: { requireResolversForArgs: 'error' },
      // requireResolversForAllFields: 'warn',
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
