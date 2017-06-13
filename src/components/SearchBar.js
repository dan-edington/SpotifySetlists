import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { artistSearch } from '../actions';

class SearchBar extends Component {

    constructor(props) {

      super(props);
      this.state = {
        artistName: ''
      }

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);

    }

    handleSubmit(e) {

      e.preventDefault();
      this.props.artistSearch(this.state.artistName);

    }

    handleChange(e) {

      this.setState({
        artistName: e.target.value
      })

    }

    render() {
        return (
            <div>
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="artistName"
                  onChange={this.handleChange}
                  value={this.props.artistName}
                />
                <input type="submit" value="Submit" />
              </form>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		artistSearch
	}, dispatch);
}

const mapStateToProps = (state) => {
  return { state }
}

SearchBar = connect(mapStateToProps, mapDispatchToProps)(SearchBar);

export default SearchBar;
