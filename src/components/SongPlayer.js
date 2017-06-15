import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SongPlayer extends Component {

  render() {

    let spotifyFullURI = `https://open.spotify.com/embed?uri=${this.props.spotifyURI}`;

    return(
      <iframe
        src={ spotifyFullURI }
        width="300"
        height="380"
        frameBorder="0"
        allowTransparency="true">
      </iframe>
    );

  }

}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({}, dispatch);
}

const mapStateToProps = (state) => {
  return {
    artistName: state.appState.artistName
  }
}

SongPlayer = connect(mapStateToProps, mapDispatchToProps)(SongPlayer);

export default SongPlayer;
