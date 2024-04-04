
import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap'; 

class SearchProd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {  
    event.preventDefault();
    console.log('Search query:', this.state.query);
    this.props.onSearch(this.state.query);
   
  }

  render() {
    return (
      <Form className="d-flex align-items-center" onSubmit={this.handleSubmit}>
        <FormControl
          type="search"
          placeholder="Type Here"
          aria-label="Search"
          value={this.state.query}
          onChange={this.handleInputChange}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>
    );
  }
}

export default SearchProd;


