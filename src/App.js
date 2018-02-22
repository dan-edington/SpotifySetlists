import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import CookieBanner from 'react-cookie-banner';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import { setToken, clearToken } from './actions';
import styleConfig from './config/styleConfig';

const AppHeader = styled.h1`
  font-family: 'Abril Fatface', cursive;
  color: ${styleConfig.colors.white};
  font-size: 5em;
  text-align: center;
  padding: 50px 0 0 0;
  margin: 0;
`;

const AuthButton = styled.button`
  margin: 50px auto 25px auto;
  display: block;
  padding: 1em;
  border: 0;
  color: ${styleConfig.colors.pink};
  background-color: ${styleConfig.colors.white};
  outline: none;
  cursor: pointer;
`;

class _App extends Component {

  constructor() {

    super();

    this.state = {
      initialSearchRun: false
    }

    this.initialSearchIsRun = this.initialSearchIsRun.bind(this);

  }

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

  initialSearchIsRun() {

    this.setState({
      initialSearchRun: true
    });

  }

  render() {

    const msg = 'This site uses cookies.';

    return (
      <div>
        <CookieBanner message={msg} />
        <div className="container">
          <header className="page-header clearfix">
            <AppHeader>Spotify Setlists</AppHeader>
            {
              this.props.loggedIntoSpotify ?
                <AuthButton
                  className="btn btn-danger col-sm-2" onClick={ this.handleLogoutClick.bind(this) }>
                Log out of Spotify
                </AuthButton>
                :
                <AuthButton
                  className="btn btn-success col-sm-2" onClick={ this.handleLoginClick.bind(this) }>
                  Log in with Spotify
                </AuthButton>
            }
          </header>
          {
            this.props.loggedIntoSpotify ?
              <div className="row">
                <SearchBar initialSearchIsRun={ this.initialSearchIsRun } />
                { this.state.initialSearchRun ? <SearchResults /> : '' }
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
