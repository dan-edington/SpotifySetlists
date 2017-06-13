import axios from 'axios';

export const artistSearchSuccess = (artistSearchData) => {
  return {
    type: "ARTIST_SEARCH_SUCCESS",
    payload: artistSearchData
  }
}

export const artistSearch = (artistName) => {

  return (dispatch) => {

    axios({
      method: 'post',
      url: '//localhost:3001/searchSetlists',
      data: {
        artistName
      }
    })
    .then((response)=>{

      const responseData = response.data;

      responseData.setlists.setlist.forEach((set) => {

        if(set.artist['@name'].toLowerCase() === artistName.toLowerCase()) {
          console.log(set)
        }

      })

      dispatch(artistSearchSuccess(responseData));

    })
    .catch((error)=>{
      console.log(error);
    });

  }

}
