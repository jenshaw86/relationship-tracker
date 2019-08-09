import React, {useState} from "react";
import RelationshipCard from "../components/relationship/RelationshipCard";
import {Button} from "react-bootstrap";
import RelationshipModal from "../components/relationship/RelationshipModal"

// props: location, history, match, relationships(collection), getRelationshipProfile(f),

const Relationships = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const displayAllRelationships = () => {
    if (props.relationships && props.relationships.length !== 0) {
      return props.relationships.map(rel => {
        return (
          <RelationshipCard
            key={rel.id}
            relationship={
              rel
            } /* getRelationshipProfile={props.getRelationshipProfile} */
          />
        );
      });
    }
  };

  return (
    <div>
      <h1>All Relationships</h1>
      <Button variant="info" onClick={handleShow}>Add New Relationship</Button>
      {displayAllRelationships()}

      {/* Add New Relationship Form */}
      < RelationshipModal show={show} handleClose={handleClose} />
    
    </div>
  );
};

export default Relationships;
