import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SetList from './SetList';

class SearchResults extends Component {

    render() {

      let setLists = this.props.setLists.map((set, i) => {
        return <SetList artistName={this.props.artistName} setData={set} key={i} />
      });

      return (
          <div>
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
