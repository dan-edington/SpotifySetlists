import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

const SpotifyIframe = styled.iframe`
  display: block;
`;

class _SongPlayer extends Component {

  render() {

    const spotifyFullURI = `https://open.spotify.com/embed?uri=${this.props.spotifyURI}`;

    return (
      <SpotifyIframe
        src={ spotifyFullURI }
        width="300"
        height="100"
        frameBorder="0"
        allowTransparency="true"
        title="songPlayer">
      </SpotifyIframe>
    );

  }

}

const mapDispatchToProps = dispatch => (
  bindActionCreators({}, dispatch)
);

const mapStateToProps = state => ({
  artistName: state.appState.artistName,
});

const SongPlayer = connect(mapStateToProps, mapDispatchToProps)(_SongPlayer);

export default SongPlayer;
