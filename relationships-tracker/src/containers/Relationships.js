import React, { useState } from "react";
import RelationshipCard from "../components/relationship/RelationshipCard";
import { Button } from "react-bootstrap";
import RelationshipModal from "../components/relationship/RelationshipModal"

const Relationships = props => {
  // modal state
  const [show, setShow] = useState(false);

  // modal handlers
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // add new relationship button
  const displayAddRelationshipButton = () => {
    return <Button onClick={() => handleShow()}>Add New Relationship</Button>
  }

  // show all relationships
  const displayRelationships = () => {
    return props.relationships.map(rel => {
      return (
        <RelationshipCard
          key={rel.id}
          relationship={rel}
          handleRemoveRelationship={props.handleRemoveRelationship}
        />
      );
    });
  }

  // display page
  const displayRelationshipsPage = () => {
    if (props.relationships && props.relationships.length !== 0) {
      return (
        <div>
          {displayAddRelationshipButton()}
          {displayRelationships()}
        </div>
      )
    } else if (props.relationships && props.relationships.length === 0) {
      return (
        <div>
          <h4>You're not tracking any relationships!</h4>
          {displayAddRelationshipButton()}
        </div>
      )
    }
  };

  return (
    <div>
      <h1>All Relationships</h1>
      {displayRelationshipsPage()}

      {/* Add New Relationship Form */}
      < RelationshipModal show={show} handleClose={handleClose} handleNewRelationship={props.handleNewRelationship} />
    
    </div>
  );
};

export default Relationships;
