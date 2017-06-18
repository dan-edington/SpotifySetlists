import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import SpotifyCredentials from './config/SpotifyCredentials.dev'; // CHANGE THIS TO .prod FOR BUILD!
import { setLoginStatus, setUserID } from './actions';
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
    this.setUserID();

  }

  getLoggedInStatus() {

    let spotifyAuthResponse = hello('spotify').getAuthResponse();
    return this.loggedIntoSpotify(spotifyAuthResponse);

  }

  setUserID() {

    hello('spotify').api({
      path: '/v1/me',
      method: 'get'
    }).then((response)=>{
      this.props.setUserID(response.id);
    });

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
        this.setUserID();
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
        this.setUserID();
      }
    );

  }

  render() {
    return (
      <div className="container">
        <header className="page-header clearfix">
          <h1>Spotify Setlists</h1>
          {
            this.props.loggedIntoSpotify ?
              <button className="btn btn-danger col-sm-2" onClick={ this.handleLogoutClick.bind(this) }>Log out of Spotify</button>
              :
              <button className="btn btn-success col-sm-2" onClick={ this.handleLoginClick.bind(this) }>Log in with Spotify</button>
          }
        </header>
        {
          this.props.loggedIntoSpotify ?
            <div className="row">
              <SearchBar />
              <SearchResults />
            </div> : ''

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
		setLoginStatus,
    setUserID
	}, dispatch);
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
