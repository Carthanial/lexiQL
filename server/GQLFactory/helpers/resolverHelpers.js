const toCamelCase = require('camelcase');
const { singular } = require('pluralize');
const { pascalCase } = require('pascal-case');
const { isJunctionTable } = require('./helperFunctions');

const resolverHelper = {};

/* */

resolverHelper.queryByPrimaryKey = (tableName, primaryKey) => {
  let queryName = '';
  if (tableName === singular(tableName)) {
    queryName += `${singular(tableName)}` + `ByID`;
  } else queryName = singular(tableName);

  return `
    ${queryName}: (parent, args) => {
      const query = 'SELECT * FROM ${tableName} WHERE ${primaryKey} = $1';
      const values = [args.${primaryKey}];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },`;
};

resolverHelper.queryAll = (tableName) => {
  return `
    ${tableName}: () => {
      const query = 'SELECT * FROM ${tableName}';
      return db.query(query)
        .then(data => data.rows)
        .catch(err => new Error(err));
    },`;
};

/* */

resolverHelper.createMutation = (tableName, primaryKey, columns) => {
  const mutationName = toCamelCase('add_' + singular(tableName));
  const columnsArray = Object.keys(columns).filter(
    (column) => column !== primaryKey
  );
  const columnsArgument = columnsArray.join(', ');
  const valuesArgument = columnsArray
    .map((column, i) => `$${i + 1}`)
    .join(', ');
  const valuesList = columnsArray.map((column) => `args.${column}`).join(', ');

  return `
    ${mutationName}: (parent, args) => {
      const query = 'INSERT INTO ${tableName} (${columnsArgument}) VALUES (${valuesArgument}) RETURNING *';
      const values = [${valuesList}];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },`;
};

resolverHelper.updateMutation = (tableName, primaryKey, columns) => {
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

  return `
    ${mutationName}: (parent, args) => {
      const query = 'UPDATE ${tableName} SET ${setStatement} WHERE ${primaryKey} = ${primaryKeyArgument} RETURNING *';
      const values = [${valuesList}];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },`;
};

resolverHelper.deleteMutation = (tableName, primaryKey) => {
  const mutationName = toCamelCase('delete_' + singular(tableName));

  return `
    ${mutationName}: (parent, args) => {
      const query = 'DELETE FROM ${tableName} WHERE ${primaryKey} = $1 RETURNING *';
      const values = [args.${primaryKey}];
      return db.query(query, values)
        .then(data => data.rows[0])
        .catch(err => new Error(err));
    },`;
};

/* */

resolverHelper.identifyRelationships = (tableName, sqlSchema) => {
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
            /* Use inline comments below as example */
            resolverBody += resolverHelper.junctionTableRelationships(
              tableName, // -------------------species
              primaryKey, // ------------------_id
              refByTableTableNameAlias, // ----species_id
              refByTable, // ------------------species_in_films
              refByTableFK, // ----------------film_id
              refByTableFKName, // ------------films
              refByTableFKKey // --------------_id
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
          refByKey
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
          console.log(
            `tableName: ${tableName}, primaryKey ${primaryKey}, fkTableName ${fkTableName} , fkKey: ${fkKey} `
          );
          resolverBody += resolverHelper.foreignKeyRelationships(
            tableName,
            primaryKey,
            fkTableName,
            fkKey
          );
        }
      }
    }
  }
  return resolverBody;
};

resolverHelper.junctionTableRelationships = () => {};

resolverHelper.customObjectsRelationships = () => {};

resolverHelper.foreignKeyRelationships = () => {};

module.exports = resolverHelper;
