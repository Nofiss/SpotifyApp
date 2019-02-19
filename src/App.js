import React, { Component } from 'react';
import './App.css';
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
import Utente from './component/Utente';
import Album from './component/Album';
import Tracks from './component/Tracks';
import { Collapse, Button } from 'reactstrap';

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
  constructor(props) {
    super(props);
    this.toggleTracks = this.toggleTracks.bind(this);
    this.toggleAlbum = this.toggleAlbum.bind(this);
    this.state = { 
      collapseTrack: false,
      collapseAlbum: false 
    };
  }

  toggleTracks() {
    this.setState({ collapseTrack: !this.state.collapseTrack });
  }

  toggleAlbum() {
    this.setState({ collapseAlbum: !this.state.collapseAlbum });
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Utente />

        <div className="topTrack">
          <div>Top Tracks ( Name, Artist, Album, Popularity )</div>
          <Button color="primary" onClick={this.toggleTracks}>Open</Button>
        </div>
        
        <Collapse isOpen={this.state.collapseTrack}>
          <Tracks />
        </Collapse>

        <div className="topAlbum">
          <div>Top Album ( Name, Artist, Popularity )</div>
          <Button color="primary" onClick={this.toggleAlbum}>Open</Button>
        </div>
        
        <Collapse isOpen={this.state.collapseAlbum}>
          <Album />
        </Collapse>

      </ApolloProvider>
    );
  }
}

export default App;
