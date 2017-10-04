import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSpotifyURI, setPlayerState } from '../actions';
import SongPlayer from './SongPlayer';

class _SetListSong extends Component {

  getSongData(key) {

    return this.props.setLists[this.props.setListID].songLists[this.props.isEncore ? 'encore' : 'main'][this.props.songID][key];

  }

  getSpotifyURI() {

    const songName = this.getSongData('songName');

    if (this.props.spotifyURIs[this.getSongData('songName')] === null) {

      this.props.getSpotifyURI({
        artistName: this.props.artistName,
        songName,
      });

    }

  }

  componentWillMount() {

    this.getSpotifyURI();

  }

  handleSongClick() {

    this.togglePlayer();

  }

  togglePlayer() {


    if (this.props.playerState &&
       this.props.playerState.setListID === this.props.setListID &&
       this.props.playerState.songID === this.props.songID) {

      this.props.setPlayerState(false);

    } else {

      this.props.setPlayerState({
        setListID: this.props.setListID,
        songID: this.props.songID,
      });

    }

  }

  render() {

    const styles = {
      greyedOut: {
        color: '#b1b1b1',
      },
    };

    return (
      <div>
        {
          this.props.spotifyURIs[this.getSongData('songName')] === false ?
            <p style={styles.greyedOut}>{ this.getSongData('songName') } (Unavailable)</p> :
            <p onClick={this.handleSongClick.bind(this)}>{ this.getSongData('songName') }</p>
        }


        {
          this.props.playerState &&
          this.props.playerState.setListID === this.props.setListID &&
          this.props.playerState.songID === this.props.songID
            ? <SongPlayer spotifyURI={ this.props.spotifyURIs[this.getSongData('songName')] } /> : ''
        }

      </div>
    );

  }

}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getSpotifyURI,
    setPlayerState,
  }, dispatch)
);

const mapStateToProps = state => ({
  artistName: state.appState.artistName,
  setLists: state.appState.setLists,
  playerState: state.appState.playerState,
  spotifyURIs: state.appState.spotifyURIs,
});

const SetListSong = connect(mapStateToProps, mapDispatchToProps)(_SetListSong);

export default SetListSong;
