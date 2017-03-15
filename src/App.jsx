import React from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

import Profile from './Profile';
import Gallery from './Gallery';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
    const BASE_URL = 'https://api.spotify.com/v1/search';
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    let FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;


    fetch(FETCH_URL, {method: 'GET'})
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];
        this.setState({artist});

        FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US`;
        fetch(FETCH_URL, {
          method: 'GET'
        })
        .then(response => response.json())
        .then(json => {
          const { tracks } = json;
          this.setState({tracks});
        });
      });
  }

  render () {
    return(
      <div className="App">
        <div className="App-title">Music Master</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for an artist"
              value={this.state.query}
              onChange={event => {this.setState({query: event.target.value})}}
              onKeyPress={event => {
                if(event.key === 'Enter'){
                  this.search()
                }
              }}
              />
            <InputGroup.Addon onClick={() => this.search()}>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null
          ?
            <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}/>
            </div>
          : <div></div>
        }

      </div>
    )
  }
}

export default App;
