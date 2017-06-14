import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { artistSearch, searchBarUpdate } from '../actions';

class SearchBar extends Component {

    constructor(props) {

      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);

    }

    handleSubmit(e) {

      e.preventDefault();
      this.props.artistSearch(this.props.searchValue);

    }

    handleChange(e) {

      this.props.searchBarUpdate(e.target.value);

    }

    render() {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              onChange={this.handleChange}
              value={this.props.searchValue}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }

}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		artistSearch,
    searchBarUpdate
	}, dispatch);
}

const mapStateToProps = (state) => {
  return {
    searchValue: state.appState.searchValue,
    artistName: state.appState.artistName
  }
}

SearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export default SearchBar;
