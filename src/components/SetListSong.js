import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import styleConfig from '../config/styleConfig';
import { setPlayerState } from '../actions';
import SongPlayer from './SongPlayer';

const UnavailableSong = styled.p`
  color: ${styleConfig.colors.grey};
`;

const Song = styled.p`
  color: ${styleConfig.colors.pink};
`;

class _SetListSong extends Component {

  getSongName() {

    return this.props.setLists[this.props.setListID].songLists[this.props.isEncore ? 'encore' : 'main'][this.props.songID];

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

    const songName = this.getSongName();

    return (
      <div>
        {
          this.props.spotifyURIs[songName] === false ?
            <UnavailableSong>{ songName } (Unavailable)</UnavailableSong> :
            <Song>{ songName }</Song>
        }
        {
          this.props.playerState &&
          this.props.playerState.setListID === this.props.setListID &&
          this.props.playerState.songID === this.props.songID
            ? <SongPlayer spotifyURI={ this.props.spotifyURIs[songName] } /> : ''
        }

      </div>
    );

  }

}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
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
