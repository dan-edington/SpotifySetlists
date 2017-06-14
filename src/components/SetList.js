import React from 'react';

const SetList = (props) => {
console.log(props);
  return(
    <div>
      <h4>{ props.artistName } @ { props.setData.venue.name }, { props.setData.venue.city }</h4>
      <p>{ props.setData.date }</p>
      <hr />
    </div>
  );

}

export default SetList;
