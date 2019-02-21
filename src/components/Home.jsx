import React, { Component } from 'react';
import Utente from './Utente';
import Artists from './Artits';
import Tracks from './Tracks';
import { Collapse, Button } from 'reactstrap';

export default class Home extends Component {
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
      <div>
        <Utente />

        <div className="topTrack">
          <div>Top Tracks</div>
          <Button color="primary" onClick={this.toggleTracks}>Open</Button>
        </div>
        
        <Collapse isOpen={this.state.collapseTrack}>
          <Tracks />
        </Collapse>

        <div className="topAlbum">
          <div>Top Artists</div>
          <Button color="primary" onClick={this.toggleAlbum}>Open</Button>
        </div>
        
        <Collapse isOpen={this.state.collapseAlbum}>
          <Artists />
        </Collapse>

      </div>
    );
  }
}
