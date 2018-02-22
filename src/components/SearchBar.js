import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { artistSearch, searchBarUpdate, resetSearchData } from '../actions';

class _SearchBar extends Component {

  constructor(props) {

    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleSubmit(e) {

    e.preventDefault();
    this.props.resetSearchData();
    this.props.artistSearch(this.props.searchValue);
    this.props.initialSearchIsRun();

  }

  handleChange(e) {

    this.props.searchBarUpdate(e.target.value);

  }

  render() {

    return (
      <div className="col-sm-12">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-10 pull-left">
              <input
                name="searchBarInput"
                type="text"
                onChange={this.handleChange}
                value={this.props.searchValue}
                className="form-control"
              />
            </div>
            <input type="submit" value="Search" className="btn btn-success col-sm-2 pull-left" />
          </div>
        </form>
        <hr />
      </div>
    );

  }

}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    artistSearch,
    searchBarUpdate,
    resetSearchData,
  }, dispatch)
);

const mapStateToProps = state => ({
  searchValue: state.appState.searchValue,
  artistName: state.appState.artistName,
});

const SearchBar = connect(mapStateToProps, mapDispatchToProps)(_SearchBar);

export default SearchBar;
