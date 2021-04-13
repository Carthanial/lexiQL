import React from 'react';
import { Route, Switch, Link, useLocation } from 'react-router-dom';
import HomePage from '../pages/homePage.jsx';
import DataPage from '../pages/dataPage.jsx';
import Logo from '../assets/new-logo.png';
import { GraphiQL } from 'graphiql';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import 'graphiql/graphiql.min.css';

export default function navBar() {
  const location = useLocation();
  //  Used to route requests for the GraphiQL component (required)
  const fetcher = (graphQLParams) => {
    return fetch('/playground', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(graphQLParams),
    })
      .then((res) => res.json())
      .catch((err) => console.log('ERR: ', err));
  };
  console.log(GraphiQL);
  if (location.pathname === '/') {
    return (
      <body id="homeBody">
        <nav id="homeHeader">
          <a
            href="https://graphql.org/learn/"
            target="_blank"
            className="headerLinks"
            rel="noreferrer"
          >
            <p>Docs</p>
          </a>

          <a
            href="https://github.com/oslabs-beta/lexiQL"
            target="_blank"
            className="headerLinks"
            rel="noreferrer"
          >
            <p>GitHub</p>
          </a>

          <Link className="headerLinks" to="/data">
            <p>Visualize</p>
          </Link>
        </nav>

        <Switch>
          <Route path="/data">
            <DataPage />
          </Route>

          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </body>
    );
  }

  if (location.pathname === '/data') {
    return (
      <body id="appBody">
        <nav id="appHeader">
          <Link className="headerLogo" to="/">
            <img className="homeLogo" id="homeLogo" src={Logo} alt="logo" />
          </Link>

          <Link className="headerLinks" to="/playground">
            <p>Playground</p>
          </Link>
        </nav>

        <Switch>
          <Route path="/playground">
            <GraphiQL fetcher={fetcher} />
          </Route>

          <Route path="/data">
            <DataPage />
          </Route>

          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </body>
    );
  }

  if (location.pathname === '/playground') {
    return (
      <body id="appBody">
        <nav id="appHeader">
          <Link className="headerLogo" to="/">
            <img className="homeLogo" id="homeLogo" src={Logo} alt="logo" />
          </Link>
          <Link className="headerLinks" to="/data">
            <p>Visualize</p>
          </Link>
        </nav>

        <Switch>
          <Route path="/playground">
            <GraphiQL fetcher={fetcher} />
          </Route>

          <Route path="/data">
            <DataPage />
          </Route>

          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </body>
    );
  }
}
