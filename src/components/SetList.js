import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SetListSong from './SetListSong';
import hello from 'hellojs';

class SetList extends Component {

  handleSavePlaylistClick() {

    this.createNewPlayList();

  }

  createNewPlayList() {

    let setListData = this.props.setLists[this.props.setListID];
    let playListURIs = [
      ...setListData.songLists.main,
      ...setListData.songLists.encore
    ].map((song) => {
      return this.props.spotifyURIs[song.songName];
    })

    hello('spotify').api({
      path: `/v1/users/${this.props.userID}/playlists`,
      method: 'post',
      data: JSON.stringify({
        name: `${this.props.artistName} @ ${setListData.venue.name}, ${setListData.venue.city} (${setListData.date})`,
        public: 'false'
      })
    }).then((res)=>{
      this.addTracksToPlayList({
        playListURIs,
        playListID: res.id
      });
    });

  }

  addTracksToPlayList(playlistData) {

    hello('spotify').api({
      path: `/v1/users/${this.props.userID}/playlists/${playlistData.playListID}/tracks`,
      method: 'post',
      data: JSON.stringify({
        uris: playlistData.playListURIs
      })
    }).then(()=>{
      alert("DONE!");
    });

  }

  render() {

    let setListData = this.props.setLists[this.props.setListID];

    let mainSongList = setListData.songLists.main.map((song, i) => {
      return(
        <SetListSong key={i} songID={i} setListID={this.props.setListID} isEncore={false} />
      )
    });

    let encoreSongList = setListData.songLists.encore.map((song, i) => {
      return(
        <SetListSong key={i} songID={i} setListID={this.props.setListID} isEncore={true} />
      )
    });

    return(
      <div className="panel panel-default">
        <header className="panel-heading">
          <h2>
            { this.props.artistName } @ { setListData.venue.name }, { setListData.venue.city } ({ setListData.date })
          </h2>
          <h4>
            { (setListData.songLists.main.length + setListData.songLists.encore.length) } songs
            { setListData.songLists.encore.length ? ', encore' : '' }
          </h4>
        </header>
        <div className="panel-body">
          { mainSongList }
          { setListData.songLists.encore.length ? <hr /> : ''}
          { encoreSongList }
          <hr />
          <button onClick={ this.handleSavePlaylistClick.bind(this) } className="btn btn-primary">Save as playlist</button>
        </div>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({}, dispatch);
}

const mapStateToProps = (state) => {
  return {
    artistName: state.appState.artistName,
    setLists: state.appState.setLists,
    userID: state.authState.userID,
    spotifyURIs: state.appState.spotifyURIs
  }
}

SetList = connect(mapStateToProps, mapDispatchToProps)(SetList);

export default SetList;
