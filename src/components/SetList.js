import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SetListSong from './SetListSong';

class SetList extends Component {

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
      <div>
        <header>
          <h2>{ this.props.artistName } @ { setListData.venue.name }, { setListData.venue.city }</h2>
          <h4>{ setListData.date }</h4>
          <p>
            { (setListData.songLists.main.length + setListData.songLists.encore.length) } songs
            { setListData.songLists.encore.length ? ', encore' : '' }
          </p>
        </header>
        { mainSongList }
        { setListData.songLists.encore.length ? <hr /> : ''}
        { encoreSongList }
        <button>Save as playlist</button>
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
    setLists: state.appState.setLists
  }
}

SetList = connect(mapStateToProps, mapDispatchToProps)(SetList);

export default SetList;
