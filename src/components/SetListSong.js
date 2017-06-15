import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSpotifyURI, setPlayerState } from '../actions';
import hello from 'hellojs';
import SongPlayer from './SongPlayer';

class SetListSong extends Component {

  constructor(props) {

    super(props);

  }

  getSpotifyURI() {

      hello('spotify').api({
        path: '/v1/search',
        method: 'get',
        data: {
          q: `artist:${this.props.artistName} track:${this.getSongData('songName')}`,
          type: 'track',
          limit: 1
        }
      }).then((response)=>{

        this.props.setSpotifyURI({
          spotifyURI: response.tracks.items[0].uri,
          isEncore: this.props.isEncore,
          setListID: this.props.setListID,
          songID: this.props.songID
        });

      });

  }

  getSongData(key) {

    return this.props.setLists
      [this.props.setListID]
      .songLists
      [this.props.isEncore?'encore':'main']
      [this.props.songID]
      [key];

  }

  componentWillMount() {

    if(!this.getSongData('spotifyURI')) {
      this.getSpotifyURI();
    }

  }

  handleClick() {

    this.togglePlayer();

  }

  togglePlayer() {


    if(this.props.playerState &&
       this.props.playerState.setListID === this.props.setListID &&
       this.props.playerState.songID === this.props.songID)
    {

      this.props.setPlayerState(false);

    } else {

      this.props.setPlayerState({
        setListID: this.props.setListID,
        songID: this.props.songID
      });

    }

  }

  render() {

    return(
      <div>
        <p onClick={this.handleClick.bind(this)}>{ this.getSongData('songName') }</p>
        {
          this.props.playerState &&
          this.props.playerState.setListID === this.props.setListID &&
          this.props.playerState.songID === this.props.songID
          ? <SongPlayer spotifyURI={ this.getSongData('spotifyURI') } /> : '' }
      </div>
    )

  }

}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
    setSpotifyURI,
    setPlayerState
  }, dispatch);
}

const mapStateToProps = (state) => {
  //console.log('here');
  return {
    artistName: state.appState.artistName,
    setLists: state.appState.setLists,
    playerState: state.appState.playerState
  }
}

SetListSong = connect(mapStateToProps, mapDispatchToProps)(SetListSong);

export default SetListSong;
