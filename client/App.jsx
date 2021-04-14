import React, { useReducer } from 'react';
import NavBar from './components/NavBar';
import { graphiqlReducer, initialGraphiqlState } from './state/reducers';
import { GraphiqlContext } from './state/contexts';

const App = () => {
  const [graphiqlState, graphiqlDispatch] = useReducer(
    graphiqlReducer,
    initialGraphiqlState
  );

  return (
    <GraphiqlContext.Provider
      value={{
        graphiqlState,
        graphiqlDispatch,
      }}
    >
      <NavBar />
    </GraphiqlContext.Provider>
  );
};

export default App;
