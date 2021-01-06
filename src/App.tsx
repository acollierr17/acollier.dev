import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Home from './containers/Home';

export default function App() {
  return (
    <Router>
      <Helmet titleTemplate="Anthony • %s" defaultTitle="Anthony Collier">
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="My personal website and corner on the internet!"
        />
        <meta
          name="og:description"
          content="My personal website and corner on the internet!"
        />
        <meta name="theme-color" content="#dd9323" />
        <meta name="author" content="Anthony Collier" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={Home} />
      </Switch>
    </Router>
  );
}
