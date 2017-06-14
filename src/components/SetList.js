import React from 'react';

const SetList = (props) => {

  let mainSongList = props.setData.songLists.main.map((song, i) => {
    return(
      <p key={i}>{song}</p>
    )
  });

  let encoreSongList = props.setData.songLists.encore.map((song, i) => {
    return(
      <p key={i}>{song}</p>
    )
  });

  return(
    <div>
      <header>
        <h2>{ props.artistName } @ { props.setData.venue.name }, { props.setData.venue.city }</h2>
        <h4>{ props.setData.date }</h4>
        <p>
          { (props.setData.songLists.main.length + props.setData.songLists.encore.length) } songs
          { props.setData.songLists.encore.length ? ', encore' : '' }
        </p>
      </header>
      { mainSongList }
      { props.setData.songLists.encore.length ? <hr /> : ''}
      { encoreSongList }
      <button>Save as playlist</button>
    </div>
  );

}

export default SetList;
