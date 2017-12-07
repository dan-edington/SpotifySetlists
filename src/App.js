import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CookieBanner from 'react-cookie-banner';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { setToken, clearToken } from './actions';

class _App extends Component {

  componentWillMount() {

    this.props.setToken();

  }

  handleLoginClick() {

    this.props.client.login().then((url) => {

      window.location.href = url;

    });

  }

  handleLogoutClick() {

    this.props.clearToken();
    window.location.href = `${window.location.protocol}//${window.location.host}`;

  }

  render() {

    const msg = 'This site uses cookies. By continuing to use this site you agree to the use of cookies.';

    return (
      <div>
        <CookieBanner
          message={msg}
        />
        <div className="container">
          <header className="page-header clearfix">
            <h1>Spotify Setlists</h1>
            {
              this.props.loggedIntoSpotify ?
                <button
                  className="btn btn-danger col-sm-2" onClick={ this.handleLogoutClick.bind(this) }>
                Log out of Spotify
                </button>
                :
                <button
                  className="btn btn-success col-sm-2" onClick={ this.handleLoginClick.bind(this) }>
                  Log in with Spotify
                </button>
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
      </div>
    );

  }

}

const mapStateToProps = state => ({

  client: state.authState.client,
  loggedIntoSpotify: state.authState.loggedIn,

});

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    setToken,
    clearToken,
  }, dispatch);

};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
