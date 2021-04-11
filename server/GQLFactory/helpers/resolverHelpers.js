const toCamelCase = require('camelcase');
const { singular } = require('pluralize');
const { pascalCase } = require('pascal-case');
const { isJunctionTable } = require('./helperFunctions');

/*********************************************************************************/
// Contain functions used in the createResolvers function
const resolverHelper = {};

// building resolvers for quaries searching for a specific entity in a table by its _id
resolverHelper.queryByPrimaryKey = (
  tableName,
  primaryKey,
  resolversObject,
  db
) => {
  let queryName = '';
  if (tableName === singular(tableName)) {
    queryName += `${singular(tableName)}` + `ByID`;
  } else queryName = singular(tableName);

  // build resolversObject for makeExecutableSchema to generate GraphiQL playground
  const camelCaseQueryName = toCamelCase(queryName);
  resolversObject.Query[camelCaseQueryName] = (parent, args) => {
    const query = `SELECT * FROM ${tableName} WHERE ${primaryKey} = $1`;
    const values = [args[primaryKey]];
    return db
      .query(query, values)
      .then((data) => data.rows[0])
      .catch((err) => new Error(err));
  };
  // building mirrorReducers string to be displayed on CodeMirror
  return `
    ${toCamelCase(queryName)}: (parent, args) => {
      const query = 'SELECT * FROM ${tableName} WHERE ${primaryKey} = $1';
      const values = [args.${primaryKey}];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },`;
};
// building resolvers for quaries of all data in a table
resolverHelper.queryAll = (tableName, resolversObject, db) => {
  // build resolversObject for makeExecutableSchema to generate GraphiQL playground
  const camelCaseTableName = toCamelCase(tableName);
  resolversObject.Query[camelCaseTableName] = () => {
    const query = `SELECT * FROM ${tableName}`;
    return db
      .query(query)
      .then((data) => data.rows)
      .catch((err) => new Error(err));
  };
  // building mirrorReducers string to be displayed on CodeMirror
  return `
    ${toCamelCase(tableName)}: () => {
      const query = 'SELECT * FROM ${tableName}';
      return db.query(query)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },`;
};

/***********************************************************************/
// building resolvers for each tables(GQL Types) create mutation
resolverHelper.createMutation = (
  tableName,
  primaryKey,
  columns,
  resolversObject,
  db
) => {
  const mutationName = toCamelCase('add_' + singular(tableName));
  const columnsArray = Object.keys(columns).filter(
    (column) => column !== primaryKey
  );
  const columnsArgument = columnsArray.join(', ');
  const valuesArgument = columnsArray
    .map((column, i) => `$${i + 1}`)
    .join(', ');
  const valuesList = columnsArray.map((column) => `args.${column}`).join(', ');

  // build resolversObject for makeExecutableSchema to generate GraphiQL playground
  resolversObject.Mutation[mutationName] = (parent, args) => {
    const valuesListClean = columnsArray.map((column) => args[column]);
    const query = `INSERT INTO ${tableName} (${columnsArgument}) VALUES (${valuesArgument}) RETURNING *`;
    const values = valuesListClean;

    return db
      .query(query, values)
      .then((data) => data.rows[0])
      .catch((err) => new Error(err));
  };
  // building mirrorReducers string to be displayed on CodeMirror
  return `
    ${mutationName}: (parent, args) => {
      const query = 'INSERT INTO ${tableName} (${columnsArgument}) VALUES (${valuesArgument}) RETURNING *';
      const values = [${valuesList}];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },`;
};

// building resolvers for each tables(GQL Types) update mutation
resolverHelper.updateMutation = (
  tableName,
  primaryKey,
  columns,
  resolversObject,
  db
) => {
  const mutationName = toCamelCase('update_' + singular(tableName));
  const columnsArray = Object.keys(columns).filter(
    (column) => column != primaryKey
  );
  const setStatement = columnsArray
    .map((column, i) => `${column} = $${i + 1}`)
    .join(', ');
  const valuesList = [
    columnsArray.map((column) => `args.${column}`).join(', ') +
      `, args.${primaryKey}`,
  ];
  const primaryKeyArgument = `$${columnsArray.length + 1}`;

  // build resolversObject for makeExecutableSchema to generate GraphiQL playground
  resolversObject.Mutation[mutationName] = (parent, args) => {
    //const valuesListClean = columnsArray.map((column) => args[column]);
    let valList = [];
    for (const key of Object.keys(args)) {
      if (key !== primaryKey) valList.push(args[key]);
    }
    //valuesListClean.push(args[primaryKey]);
    valList.push(args[primaryKey]);
    const argsArray = Object.keys(args).filter((key) => key !== primaryKey);
    let setString = argsArray.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const pKArg = `$${argsArray.length + 1}`;

    console.log('ARGS: ', args);
    //const query = `UPDATE ${tableName} SET ${setStatement} WHERE ${primaryKey} = ${primaryKeyArgument} RETURNING *`;
    const query = `UPDATE ${tableName} SET ${setString} WHERE ${primaryKey} = ${pKArg} RETURNING *`;
    //const values = valuesListClean;
    const values = valList;
    console.log('VALUES: ', values);
    return db
      .query(query, values)
      .then((data) => data.rows[0])
      .catch((err) => new Error(err));
  };
  // building mirrorReducers string to be displayed on CodeMirror
  return `
    ${mutationName}: (parent, args) => {
      const query = 'UPDATE ${tableName} SET ${setStatement} WHERE ${primaryKey} = ${primaryKeyArgument} RETURNING *';
      const values = [${valuesList}];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },`;
};

// building resolvers for each tables(GQL Types) delete mutation
resolverHelper.deleteMutation = (
  tableName,
  primaryKey,
  resolversObject,
  db
) => {
  const mutationName = toCamelCase('delete_' + singular(tableName));

  // build resolversObject for makeExecutableSchema to generate GraphiQL playground
  resolversObject.Mutation[mutationName] = (parent, args) => {
    const query = `DELETE FROM ${tableName} WHERE ${primaryKey} = $1 RETURNING *`;
    const values = [args[primaryKey]];
    return db
      .query(query, values)
      .then((data) => data.rows[0])
      .catch((err) => new Error(err));
  };
  // building mirrorReducers string to be displayed on CodeMirror
  return `
    ${mutationName}: (parent, args) => {
      const query = 'DELETE FROM ${tableName} WHERE ${primaryKey} = $1 RETURNING *';
      const values = [args.${primaryKey}];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },`;
};
/***************************************************************************************************************/
// building resolvers for each tables(GQL Types) different relationship types (foreignKeys, tables referencing the current table etc.)
resolverHelper.identifyRelationships = (
  tableName,
  sqlSchema,
  resolversObject,
  resolverName,
  db
) => {
  const { primaryKey, referencedBy, foreignKeys } = sqlSchema[tableName];
  let resolverBody = '';
  /* Keeps track of custom object types already added to resolverBody string */
  const inResolverBody = [];
  /* Looping through each table that references tableName */
  for (const refByTable of Object.keys(referencedBy)) {
    /* Shorthand labels for refByTable's properties */
    const { foreignKeys: refFK, columns: refCols } = sqlSchema[refByTable];
    /* If refByTable is a Junction Table we concat its ForeignKeys refTableName to resolverBody */
    if (isJunctionTable(refFK, refCols)) {
      /* Column name on Junction Table (refByTable) referencing the current tableName */
      let refByTableTableNameAlias = '';
      for (const fk of Object.keys(refFK)) {
        if (refFK[fk].referenceTable === tableName) {
          refByTableTableNameAlias = fk;
        }
      }
      /* Loop through refByTable's foreignkeys */
      for (const refByTableFK of Object.keys(refFK)) {
        /* Filtering out tableName */
        if (refFK[refByTableFK].referenceTable !== tableName) {
          const refByTableFKName =
            refFK[refByTableFK].referenceTable; /* refByTableFKName = people */
          const refByTableFKKey =
            refFK[refByTableFK].referenceKey; /* refByTableFKKey = _id */
          /* Check if refByTableFKName has already been added to resolverBody string */
          if (!inResolverBody.includes(refByTableFKName)) {
            inResolverBody.push(refByTableFKName);
            // console.log(
            //   'tableName: ',
            //   tableName,
            //   'primaryKey: ',
            //   primaryKey,
            //   'refByTableTableNameAlias: ',
            //   refByTableTableNameAlias,
            //   'refByTable: ',
            //   refByTable,
            //   'refByTableFK: ',
            //   refByTableFK,
            //   'refByTableFKName: ',
            //   refByTableFKName,
            //   'refByTableFKKey: ',
            //   refByTableFKKey
            // );

            /* Use inline comments below as example */
            resolverBody += resolverHelper.junctionTableRelationships(
              tableName, // -------------------species
              primaryKey, // ------------------_id
              refByTableTableNameAlias, // ----species_id
              refByTable, // ------------------species_in_films
              refByTableFK, // ----------------film_id
              refByTableFKName, // ------------films
              refByTableFKKey, // --------------_id
              resolversObject,
              resolverName,
              db
            );
          }
        }
      }
    } else {
      /* Check if refByTable has already been added to resolverBody string */
      if (!inResolverBody.includes(refByTable)) {
        inResolverBody.push(refByTable);
        const refByKey = referencedBy[refByTable];
        /* referencedBy tables that are not Junction tables */
        resolverBody += resolverHelper.customObjectsRelationships(
          tableName,
          primaryKey,
          refByTable,
          refByKey,
          resolversObject,
          resolverName,
          db
        );
      }
    }
    /* Creates resolvers for current tableName's foreignKeys */
    if (foreignKeys) {
      for (const fk of Object.keys(foreignKeys)) {
        const fkTableName = foreignKeys[fk].referenceTable;
        /* Check if fk has already been added to resolverBody string */
        if (!inResolverBody.includes(fkTableName)) {
          inResolverBody.push(fkTableName);
          const fkKey = foreignKeys[fk].referenceKey;
          resolverBody += resolverHelper.foreignKeyRelationships(
            tableName,
            primaryKey,
            fk,
            fkTableName,
            fkKey,
            resolversObject,
            resolverName,
            db
          );
        }
      }
    }
  }
  return resolverBody;
};
/*******************Functions Called In Above Function*****************************/

// building resolvers for each tables(GQL Types) junction table relationships
resolverHelper.junctionTableRelationships = (
  tableName,
  primaryKey,
  refByTableTableNameAlias,
  refByTable,
  refByTableFK,
  refByTableFKName,
  refByTableFKKey,
  resolversObject,
  resolverName,
  db
) => {
  // build resolversObject for makeExecutableSchema to generate GraphiQL playground
  resolversObject[resolverName][refByTableFKName] = (tableName) => {
    const query = `SELECT * FROM ${refByTableFKName} LEFT OUTER JOIN ${refByTable} ON ${refByTableFKName}.${refByTableFKKey} = ${refByTable}.${refByTableFK} WHERE ${refByTable}.${refByTableTableNameAlias} = $1`;
    const values = [tableName[primaryKey]];
    return db
      .query(query, values)
      .then((data) => data.rows)
      .catch((err) => new Error(err));
  };
  // building mirrorReducers string to be displayed on CodeMirror
  return `
    ${toCamelCase(refByTableFKName)}: (${toCamelCase(tableName)}) => {
      const query = 'SELECT * FROM ${refByTableFKName} LEFT OUTER JOIN ${refByTable} ON ${refByTableFKName}.${refByTableFKKey} = ${refByTable}.${refByTableFK} WHERE ${refByTable}.${refByTableTableNameAlias} = $1';
      const values = [${tableName}.${primaryKey}];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    }, `;
};

// building resolvers for each tables(GQL Types) relationships to other custom objects (types/tables)
resolverHelper.customObjectsRelationships = (
  tableName,
  primaryKey,
  refByTable,
  refByKey,
  resolversObject,
  resolverName,
  db
) => {
  const camelCasedRefByTable = toCamelCase(refByTable);
  const camelCasedTableName = toCamelCase(tableName);
  // build resolversObject for makeExecutableSchema to generate GraphiQL playground
  resolversObject[resolverName][camelCasedRefByTable] = (
    camelCasedTableName
  ) => {
    const query = `SELECT * FROM ${refByTable} WHERE ${refByKey} = $1`;
    const values = [camelCasedTableName[primaryKey]];
    return db
      .query(query, values)
      .then((data) => data.rows)
      .catch((err) => new Error(err));
  };
  // building mirrorReducers string to be displayed on CodeMirror
  return `
    ${toCamelCase(refByTable)}: (${toCamelCase(tableName)}) => {
      const query = 'SELECT * FROM ${refByTable} WHERE ${refByKey} = $1';
      const values = [${toCamelCase(tableName)}.${primaryKey}];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },`;
};
// building resolvers for each tables(GQL Types) foreign key relationships
resolverHelper.foreignKeyRelationships = (
  tableName,
  primaryKey,
  fk,
  fkTableName,
  fkKey,
  resolversObject,
  resolverName,
  db
) => {
  const camelCasedFkTableName = toCamelCase(fkTableName);
  const camelCasedTableName = toCamelCase(tableName);
  // build resolversObject for makeExecutableSchema to generate GraphiQL playground
  resolversObject[resolverName][camelCasedFkTableName] = (
    camelCasedTableName
  ) => {
    const query = `SELECT ${fkTableName}.* FROM ${fkTableName} LEFT OUTER JOIN ${tableName} ON ${fkTableName}.${fkKey} = ${tableName}.${fk} WHERE ${tableName}.${primaryKey} = $1`;
    const values = [camelCasedTableName[primaryKey]];
    return db
      .query(query, values)
      .then((data) => data.rows)
      .catch((err) => new Error(err));
  };
  // building mirrorReducers string to be displayed on CodeMirror
  return `
    ${toCamelCase(fkTableName)}: (${toCamelCase(tableName)}) => {
      const query = 'SELECT ${fkTableName}.* FROM ${fkTableName} LEFT OUTER JOIN ${tableName} ON ${fkTableName}.${fkKey} = ${tableName}.${fk} WHERE ${tableName}.${primaryKey} = $1';
      const values = [${toCamelCase(tableName)}.${primaryKey}];
      return db.query(query, values)
        .then(data => data.rows)
        .catch(err => new Error(err));
    }, `;
};

module.exports = resolverHelper;
