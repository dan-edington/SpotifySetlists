import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserHandler, PlaylistHandler } from 'spotify-sdk';
import SetListSong from './SetListSong';

class _SetList extends Component {

  handleSavePlaylistClick() {

    this.createNewPlayList();

  }

  createNewPlayList() {

    const setListData = this.props.setLists[this.props.setListID];
    const playListURIs = [
      ...setListData.songLists.main,
      ...setListData.songLists.encore,
    ].filter(song => (
      this.props.spotifyURIs[song] ? true : false
    )).map(song => (
      this.props.spotifyURIs[song]
    ));

    const userHandler = new UserHandler();
    const PLHandler = new PlaylistHandler();

    userHandler.me()
      .then((userHandlerResponse) => {

        PLHandler.create(userHandlerResponse._id, `${this.props.artistName} @ ${setListData.venue.name}, ${setListData.venue.city} (${setListData.date})`, false)
          .then((PLHandlerResponse) => {

            PLHandler.addTracks(playListURIs, userHandlerResponse._id, PLHandlerResponse._id)
              .then(() => {

                alert("DONE! Check your Spotify playlists...");

              });

          })

    });

  }

  render() {

    const setListData = this.props.setLists[this.props.setListID];

    const mainSongList = setListData.songLists.main.map((song, i) => (
      <SetListSong key={i} songID={i} setListID={this.props.setListID} isEncore={false} />
    ));

    const encoreSongList = setListData.songLists.encore.map((song, i) => (
      <SetListSong key={i} songID={i} setListID={this.props.setListID} isEncore={true} />
    ));

    return (
      <div className="panel panel-default">
        <header className="panel-heading">
          <h2>
            { this.props.artistName } @ { setListData.venue.name },
            { setListData.venue.city } ({ setListData.date })
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
          <button
            onClick={ this.handleSavePlaylistClick.bind(this) }
            className="btn btn-primary">Save as playlist</button>
        </div>
      </div>
    );

  }

}

const mapDispatchToProps = dispatch => (
  bindActionCreators({}, dispatch)
);

const mapStateToProps = state => ({
  artistName: state.appState.artistName,
  setLists: state.appState.setLists,
  userID: state.authState.userID,
  spotifyURIs: state.appState.spotifyURIs,
});

const SetList = connect(mapStateToProps, mapDispatchToProps)(_SetList);

export default SetList;
