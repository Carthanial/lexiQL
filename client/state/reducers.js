// Visualizer display on app page
export const initialDiagramState = {
  dbContents: [],
  tableNodes: [{}],
};

export const diagramReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TABLES':
      return {
        ...state,
        sqlSchema: action.payload.sqlSchema,
        tableNodes: action.payload.tableNodes,
        dbContents: action.payload.dbContents,
        relationalData: action.payload.relationalData,
        primaryKeys: action.payload.primaryKeys,
      };
  }
};

export const initialCodeState = {
  schema: '',
  resolver: '',
  displayCode: '',
  graphiqlSchema: '',
  codeIsOpen: true,
};

export const codeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CODE':
      console.log(
        'CODEREDUCER GRAPHIQLSCHEMA: ',
        action.payload.graphiqlSchema
      );
      return {
        ...state,
        schema: action.payload.schema,
        resolver: action.payload.resolver,
        displayCode: action.payload.displayCode,
        graphiqlSchema: action.payload.graphiqlSchema,
      };
    case 'SET_DISPLAY':
      return {
        ...state,
        displayCode: action.payload.displayCode,
      };

    case 'TOGGLE_CODE':
      return {
        ...state,
        codeIsOpen: action.payload.codeIsOpen,
      };
  }
};

export const initialFormState = {
  formIsOpen: true,
  firstFetch: true,
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FORM':
      return {
        ...state,
        formIsOpen: action.payload.formIsOpen,
        firstFetch: action.payload.firstFetch,
      };
  }
};

export const initialGraphiqlState = {
  graphiqlSchema: '',
};

export const graphiqlReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCHEMA':
      console.log(
        'GRAPHIQLREDUCER GRAPHIQLSCHEMA: ',
        action.payload.graphiqlSchema
      );
      return {
        ...state,
        graphiqlSchema: action.payload.graphiqlSchema,
      };
  }
};
