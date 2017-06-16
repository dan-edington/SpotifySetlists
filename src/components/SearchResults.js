import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SetList from './SetList';

class SearchResults extends Component {

    render() {

      let setLists = this.props.setLists.map((set, i) => {
        return <SetList key={i} setListID={i} />
      });

      return (
          <div className="col-sm-12">
            {setLists}
          </div>
      );

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

SearchResults = connect(mapStateToProps, mapDispatchToProps)(SearchResults);

export default SearchResults;
