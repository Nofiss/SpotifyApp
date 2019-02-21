import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Menu from './components/Menu';
import Home from './components/Home';
import Artista from './components/Artista';

const authAfterware = new onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors){
      if (err.message === 'Unauthorized') {
        window.open('http://10.50.65.15:4000/auth/connect', '_self', false)
      }
    }
  }
})

const link = new createHttpLink({ uri: 'http://10.50.65.15:4000/graphql', credentials: 'include' })

const client = new ApolloClient({
  link: authAfterware.concat(link),
  cache: new InMemoryCache()
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Menu />
            <Route exact path={`/`} component={Home} />
            <Route path={`/:topId`} component={Artista}/>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
