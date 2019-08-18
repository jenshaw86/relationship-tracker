import React from "react";
import RelationshipCard from "./RelationshipCard";
import AddRelationshipButton from './AddRelationshipButton'

const Relationships = props => {
  // show all relationships
  const displayRelationships = () => {
    return props.relationships.map(rel => {
      return (
        <RelationshipCard
          key={rel.id}
          relationship={rel}
          setRelationships={props.setRelationships}
          setRelationshipView={props.setRelationshipView}
          setEvents={props.setEvents}
        />
      );
    });
  }

  // display page
  const displayRelationshipsPage = () => {
    if (props.relationships && props.relationships.length !== 0) {
      return (
        <div>
          <AddRelationshipButton handleNewRelationship={props.handleNewRelationship} />
          {displayRelationships()}
        </div>
      )
    } else if (props.relationships && props.relationships.length === 0) {
      return (
        <div>
          <h4>You're not tracking any relationships!</h4>
          <AddRelationshipButton handleNewRelationship={props.handleNewRelationship}/>
        </div>
      )
    }
  };

  return (
    <div>
      <h1>All Relationships</h1>
      {displayRelationshipsPage()}    
    </div>
  );
};

export default Relationships;
