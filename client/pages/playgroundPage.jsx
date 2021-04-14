import React, { useContext } from 'react';
import { GraphiqlContext } from '../state/contexts';
import GraphiQL from 'graphiql';

export default function playgroundPage() {
  // const { codeState } = useContext(CodeContext);
  // const { graphiqlSchema } = codeState;
  // console.log('graphiqlSchema: ', graphiqlSchema);

  const { graphiqlState } = useContext(GraphiqlContext);
  const { graphiqlSchema } = graphiqlState;
  console.log('graphiqlState:', graphiqlState);
  console.log('graphiqlSchema:', graphiqlSchema);

  const fetcher = (graphiqlSchema) => {
    return fetch('/playground', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphiqlSchema),
    })
      .then((res) => res.json())
      .catch((err) => console.log('ERR: ', err));
  };

  //schema={graphiqlSchema}
  return (
    <div className="playgroundPage">
      <div>
        <GraphiQL fetcher={fetcher} />
      </div>
    </div>
  );
}
