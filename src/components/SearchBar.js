import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import styleConfig from '../config/styleConfig';
import { artistSearch, searchBarUpdate, resetSearchData, setInitialSearchRun } from '../actions';

const SearchBarInput = styled.input`
  outline: none;
  border: 0;
  color: ${styleConfig.colors.pink};
  text-align: center;
  padding: 1em;
  flex: 1;
  margin-right: 2px;
`;

const SearchButton = styled.input`
  outline: none; 
  padding: 1em;
  border: 0;
  color: ${styleConfig.colors.pink};
  background-color: ${styleConfig.colors.white};
  cursor: pointer;
  -webkit-appearance: none;
`;

const SearchForm = styled.form`
  display: flex;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 500px;
  min-width: 300px;
`;

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
    this.props.setInitialSearchRun();

  }

  handleChange(e) {

    this.props.searchBarUpdate(e.target.value);

  }

  render() {

    return (
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchBarInput
            name="searchBarInput"
            type="text"
            onChange={this.handleChange}
            value={this.props.searchValue}
          />
          <SearchButton type="submit" value="Search" />
        </SearchForm>
    );

  }

}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    artistSearch,
    searchBarUpdate,
    resetSearchData,
    setInitialSearchRun,
  }, dispatch)
);

const mapStateToProps = state => ({
  searchValue: state.appState.searchValue,
  artistName: state.appState.artistName,
});

const SearchBar = connect(mapStateToProps, mapDispatchToProps)(_SearchBar);

export default SearchBar;
