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
      if(song.spotifyURI) {
        return song.spotifyURI;
      }
    })
    .filter((song) => {
      return song;
    });

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

    let styles = {
      'setList-panel': {
        'padding': '20px',
        'marginBottom': '20px'
      },
      'divider': {
        'border': '0',
        'height': '1px'
      }
    }

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
      <div className="bg-info clearfix" style={styles['setList-panel']}>
        <header>
          <h2>
            { this.props.artistName } @ { setListData.venue.name }, { setListData.venue.city } ({ setListData.date })
          </h2>
          <p>
            { (setListData.songLists.main.length + setListData.songLists.encore.length) } songs
            { setListData.songLists.encore.length ? ', encore' : '' }
          </p>
        </header>
        <hr className="bg-primary" style={styles['divider']} />
        { mainSongList }
        { setListData.songLists.encore.length ? <hr className="bg-primary" style={styles['divider']} /> : ''}
        { encoreSongList }
        <button onClick={ this.handleSavePlaylistClick.bind(this) } className="btn btn-primary">Save as playlist</button>
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
    userID: state.authState.userID
  }
}

SetList = connect(mapStateToProps, mapDispatchToProps)(SetList);

export default SetList;
