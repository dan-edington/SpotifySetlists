import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import SpotifyCredentials from './config/SpotifyCredentials';
import { setLoginStatus } from './actions';
import hello from 'hellojs';

class App extends Component {

  componentWillMount() {

    hello.init({
      spotify: {
        name: 'spotify',
        oauth: {
          version: 2,
          auth: 'https://accounts.spotify.com/authorize',
          grant: 'https://accounts.spotify.com/api/token'
        },
        refresh: true,
        base: 'https://api.spotify.com/'
      }
    });

    hello.init(
      { spotify: SpotifyCredentials.clientID },
      { redirect_uri: SpotifyCredentials.callbackURL }
    );

    this.props.setLoginStatus(this.getLoggedInStatus());

  }

  getLoggedInStatus() {

    let spotifyAuthResponse = hello('spotify').getAuthResponse();
    return this.loggedIntoSpotify(spotifyAuthResponse);

  }

  loggedIntoSpotify(session) {

    let currentTime = (new Date()).getTime() / 1000;
	  return session && session.access_token && session.expires > currentTime;

  }

  handleLoginClick() {

    hello.login(
      'spotify',
      {
        scope: 'playlist-modify-private'
      },
      () => {
        this.props.setLoginStatus(this.getLoggedInStatus());
      }
    );

  }

  handleLogoutClick() {

    hello.logout(
      'spotify',
      {
        force: true
      },
      () => {
        this.props.setLoginStatus(this.getLoggedInStatus());
      }
    );

  }

  render() {
    return (
      <div className="container">
        <header>
          <h1 className="col-sm-10">Spotify Setlists</h1>
          <hr />
        </header>
        {
          this.props.loggedIntoSpotify ?
            <div>
              <button className="btn btn-danger col-sm-2" onClick={ this.handleLogoutClick.bind(this) }>Log out of Spotify</button>
              <SearchBar />
              <SearchResults />
            </div> :
            <button className="btn btn-success col-sm-2" onClick={ this.handleLoginClick.bind(this) }>Log in with Spotify</button>
        }
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
