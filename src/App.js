import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

class App extends Component {
  render() {
    return (
      <div>
        <header>Spotify Setlists</header>
        <SearchBar />
        <SearchResults />
      </div>
    );
  }
}

export default App;
