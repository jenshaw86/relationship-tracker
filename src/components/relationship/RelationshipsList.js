import React, { Component } from "react";
import RelationshipCard from "./RelationshipCard";
import AddRelationshipButton from './AddRelationshipButton'
import { Container, Form } from 'react-bootstrap'

class RelationshipsList extends Component {
  constructor(props) {
    super(props)
    // this.state = {listOrder: this.props.relationships}
  }
  
  static getDerivedStateFromProps(props, _state) {
    return {listOrder: props.relationships}
    // return {listOrder: props.relationships.sort((a,b) => a.created_at > b.created_at ? -1 : 1)}
  }
  
  handleChange = val => {
    let newOrder = this.state.listOrder;
    switch(val) {
      case "first_az":
        newOrder = this.state.listOrder.sort((a,b) => a.first_name < b.first_name ? -1 : 1);
        break;
      case "first_za":
        newOrder = this.state.listOrder.sort((a,b) => a.first_name > b.first_name ? -1 : 1)
        break;
      case "last_az":
        newOrder = (this.state.listOrder.sort((a,b) => a.last_name < b.last_name ? -1 : 1))
        break;
      case "last_za":
        newOrder = (this.state.listOrder.sort((a,b) => a.last_name > b.last_name ? -1 : 1))
        break;
      case "most_recent":
        newOrder = this.state.listOrder.sort((a,b) => mostRecentEvent(a,b))
        break;
      case "least_recent":
        newOrder = this.state.listOrder.sort((a,b) => mostRecentEvent(a,b)).reverse()
        break;
      case "most_freq":
        newOrder = (this.state.listOrder.sort((a,b) => b.events.length - a.events.length))
        break;
      case "least_freq":
        newOrder = (this.state.listOrder.sort((a,b) => a.events.length - b.events.length))
        break;
      default:
        break;
    }
    this.setState({listOrder: newOrder});

    function mostRecentEvent(a, b) {
      let recentA = 0;
      let recentB = 0;
      let now = (new Date()).getTime()

      a.events.forEach(ev => {
        let endDate = new Date(ev.end_date.toLocaleString()).getTime()
        if (endDate < now && endDate > recentA) {
          recentA = endDate
        }
      })
      b.events.forEach(ev => {
        let endDate = new Date(ev.end_date.toLocaleString()).getTime()
        if (endDate < now && endDate > recentB) {
          recentB = endDate
        }
      })
      return recentA > recentB ? -1 : 1
    }
  }

  displayFilter = () => {
    return(
      <div className="reorder-select">
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Order by:</Form.Label>
            <Form.Control as="select"
            onChange={ev => {
              this.handleChange(ev.target.value)
            }}>
              <option value="first_az">First Name Alphabetically A-Z</option>
              <option value="first_za">First Name Alphabetically Z-A</option>
              <option value="last_az">Last Name Alphabetically A-Z</option>
              <option value="last_za">Last Name Alphabetically Z-A</option>
              <option value="most_recent">Most Recently Seen</option>
              <option value="least_recent">Least Recently Seen</option>
              <option value="most_freq">Most Frequently Seen</option>
              <option value="least_freq">Least Frequently Seen</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </div>
    )
  }
  
  // show all relationships
  displayRelationships = () => {
    if(this.state.listOrder.length !== 0) {
      return this.state.listOrder.map(rel => {
        return (
          <RelationshipCard
            key={rel.id}
            userId={this.props.userId}
            relationship={rel}
            viewRelationship={this.props.viewRelationship}
            updateRelationships={this.props.updateRelationships}
            handleDeletedRelationship={this.props.handleDeletedRelationship}
            updateEvents={this.props.updateEvents}
          />
        );
      });
    }
  }

  // display page
  displayRelationshipsPage = () => {
    if (this.props.relationships && this.props.relationships.length !== 0) {
      return (
        <>
          {this.displayFilter()}
          <div className="relationships-list">
          {this.displayRelationships()}
          </div>
        </>
      )
    } else if (this.props.relationships && this.props.relationships.length === 0) {
      return (
        <div>
          <h4>You're not tracking any relationships!</h4>
        </div>
      )
    }
  };

  render() {
    return (
      <Container className="relationships-container">
        <h2>Connections</h2>
        <AddRelationshipButton 
          userId={this.props.userId} 
          handleNewRelationship={this.props.handleNewRelationship} 
        />
        {this.displayRelationshipsPage()}    
      </Container>
    );
  }
};

export default RelationshipsList;
