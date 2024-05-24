import React, { Component } from 'react';

class SearchInput extends Component {
  render() {
    return (
      <div>
        <input type="text" placeholder="Search..." onChange={this.props.onChange} />
        <button disabled>Filter</button>
      </div>
    );
  }
}

export default SearchInput;
