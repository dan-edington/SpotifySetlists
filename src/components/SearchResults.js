import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import styleConfig from '../config/styleConfig';
import SetList from './SetList';

const ArtistNotFound = styled.p`
  text-align: center;
  max-width: 500px;
  min-width: 300px;
  background-color: ${styleConfig.colors.white};
  color: ${styleConfig.colors.pink};
  margin: 30px auto 0 auto;
  padding: 20px;
`;

class _SearchResults extends Component {

  render() {
    
    let setListsOutput;

    if(!this.props.artistName && this.props.initialSearchRun) {
      setListsOutput = <ArtistNotFound>Artist Not Found</ArtistNotFound>
    } else {
      setListsOutput = this.props.setLists.map((set, i) => (
        <SetList key={i} setListID={i} />
      ));
    }

    return (
      <div>
        {setListsOutput}
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
  initialSearchRun: state.appState.initialSearchRun,
});

const SearchResults = connect(mapStateToProps, mapDispatchToProps)(_SearchResults);

export default SearchResults;
