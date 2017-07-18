import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SetList from './SetList';

class _SearchResults extends Component {

  render() {

    const setLists = this.props.setLists.map((set, i) => (
      <SetList key={i} setListID={i} />
    ));

    return (
      <div className="col-sm-12">
        {setLists}
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
});

const SearchResults = connect(mapStateToProps, mapDispatchToProps)(_SearchResults);

export default SearchResults;
