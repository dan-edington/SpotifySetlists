import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import SpotifyCredentials from './config/SpotifyCredentials';
import { setLoginStatus } from './actions';
import hello from 'hellojs';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleLoginClick.bind(this);

    hello.init({
      spotify: {
        name: 'spotify',
        oauth: {
          version: 2,
          auth: 'https://accounts.spotify.com/authorize',
          grant: 'https://accounts.spotify.com/api/token'
        },
        refresh: true,
        base: 'https://api.spotify.com'
      }
    });

    hello.init(
      { spotify: SpotifyCredentials.clientID },
      { redirect_uri: SpotifyCredentials.callbackURL }
    );

    let spotifyAuthResponse = hello('spotify').getAuthResponse();

    this.props.setLoginStatus(this.loggedIntoSpotify(spotifyAuthResponse));

  }

  loggedIntoSpotify(session) {
    let currentTime = (new Date()).getTime() / 1000;
	  return session && session.access_token && session.expires > currentTime;
  }

  handleLoginClick(e) {

    hello('spotify').login().then((response)=>{
      setLoginStatus(this.loggedIntoSpotify(response.authResponse));
    })

  }

  render() {
    return (
      <div>
        <header>Spotify Setlists</header>
        {
          this.props.loggedIntoSpotify ?
            '' : <button onClick={ this.handleLoginClick }>Log in with Spotify</button> 
        }
        <SearchBar />
        <SearchResults />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    loggedIntoSpotify: state.authState.loggedIntoSpotify
  }
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		setLoginStatus
	}, dispatch);
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
