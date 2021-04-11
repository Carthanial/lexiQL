const { pascalCase } = require('pascal-case');
const { singular } = require('pluralize');
const { debug } = require('webpack');
const resolverHelper = require('./helpers/resolverHelpers');
const resolverFactory = {};

resolverFactory.collectQueries = (
  tableName,
  tableData,
  resolversObject,
  db
) => {
  const { primaryKey } = tableData;
  const queryByPK = resolverHelper.queryByPrimaryKey(
    tableName,
    primaryKey,
    resolversObject,
    db
  );
  const queryAll = resolverHelper.queryAll(tableName, resolversObject, db);
  return `\n${queryByPK}\n${queryAll}`;
};
/* -------------------------------- */
resolverFactory.collectMutations = (
  tableName,
  tableData,
  resolversObject,
  db
) => {
  const { primaryKey, columns } = tableData;
  const createMutation = resolverHelper.createMutation(
    tableName,
    primaryKey,
    columns,
    resolversObject,
    db
  );
  const updateMutation = resolverHelper.updateMutation(
    tableName,
    primaryKey,
    columns,
    resolversObject,
    db
  );
  const deleteMutation = resolverHelper.deleteMutation(
    tableName,
    primaryKey,
    resolversObject,
    db
  );
  return `${createMutation}\n${updateMutation}\n${deleteMutation}\n`;
};
/* ------------------------------------ */
resolverFactory.collectCustomObjectRelationships = (
  tableName,
  sqlSchema,
  resolversObject,
  db
) => {
  if (!sqlSchema[tableName].referencedBy) return '';
  const resolverName = pascalCase(singular(tableName));
  const resolverBody = resolverHelper.identifyRelationships(
    tableName,
    sqlSchema,
    resolversObject,
    resolverName,
    db
  );

  return `
    ${resolverName}: {
      ${resolverBody}
    }, \n`;
};

module.exports = resolverFactory;
