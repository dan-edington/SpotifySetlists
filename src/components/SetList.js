import React from 'react';

const SetList = (props) => {

  let songList = props.setData.songLists.main.map((song, i) => {
    return(
      <p key={i}>{song}</p>
    )
  })

  return(
    <div>
      <h4>{ props.artistName } @ { props.setData.venue.name }, { props.setData.venue.city }</h4>
      <h5>{ props.setData.date }</h5>
      {songList}
      <button>Save as playlist</button>
      <hr />
    </div>
  );

}

export default SetList;
