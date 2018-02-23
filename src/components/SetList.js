import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserHandler, PlaylistHandler } from 'spotify-sdk';
import styled from 'styled-components';
import styleConfig from '../config/styleConfig';
import SetListSong from './SetListSong';
import SongPlayer from './SongPlayer';

const SetListContainer = styled.div`
  margin: 30px auto 0 auto;
  padding: 25px 25px 15px 25px;
  max-width: 500px;
  min-width: 300px;
  background-color: ${styleConfig.colors.white};
`;

const SetListInfo = styled.h2`
  color: ${styleConfig.colors.pink};
  font-weight: 100;
  font-size: ${
    props => (
      (((parseInt(props.level, 10) + -3) * -1) + 1) * 0.85
    )
  }em;
  padding: 0;
  margin: 0;
  margin-bottom: 10px
`;

const SetListSongCount = styled.h4`
  color: ${styleConfig.colors.pink};
  padding: 0;
  margin: 20px 0;
  font-weight: 100;
  font-size: 0.9em
`;

const SongDivider = styled.hr`
  padding: 0;
  border: 0;
  margin: 0;
  width: 100%;
  height: 1px;
  background-color: ${styleConfig.colors.pink};
`;

const SavePlayListButton = styled.button`
  outline: none; 
  padding: 1em;
  border: 0;
  color: ${styleConfig.colors.pink};
  background-color: ${styleConfig.colors.white};
  cursor: pointer;
  width: 100%;
  display: block;
  margin: 10px auto 0 auto;
  max-width: 500px;
  min-width: 300px;
  -webkit-appearance: none;
`;

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

          });

      });

  }

  render() {

    const setListData = this.props.setLists[this.props.setListID];
    let songCounter = 0;

    const mainSongList = setListData.songLists.main.map((song, i) => {

      const output = <SetListSong key={i} songID={i} setListID={this.props.setListID} isEncore={false} /> 
      songCounter++;
      return output;

    });

    const encoreSongList = setListData.songLists.encore.map((song, i) => {

      const output = <SetListSong key={i} songID={i} setListID={this.props.setListID} isEncore={true} />
      songCounter++;
      return output;

    });

    return (
      <div>
        <SetListContainer>
          <header>
            <SetListInfo level="1">
              { this.props.artistName }
            </SetListInfo>
            <SetListInfo level="2">
            { setListData.venue.name }, { setListData.venue.city }
            </SetListInfo>
            <SetListInfo level="3">
              { setListData.date }
            </SetListInfo>
            <SetListSongCount>
              { (setListData.songLists.main.length + setListData.songLists.encore.length) } songs
              { setListData.songLists.encore.length ? ', encore' : '' }
            </SetListSongCount>
          </header>
          <SongDivider />
          <div>
            { mainSongList }
            { setListData.songLists.encore.length ? <SongDivider /> : ''}
            { encoreSongList }
          </div>
        </SetListContainer>
        <SavePlayListButton
              onClick={ this.handleSavePlaylistClick.bind(this) }>Save as playlist</SavePlayListButton>
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
