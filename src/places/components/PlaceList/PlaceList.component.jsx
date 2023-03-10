import React from "react";
import Card from "../../../shared/components/UIElements/Card/Card.component";

import PlaceItem from "../PlaceItem/PlaceItem.component";
import Button from "../../../shared/components/FormElements/Button/Button.component";

import "./PlaceList.styles.css";

// PlaceList components
// receives items and onDeletePlace props
// renders Card containing h2 and Button component if items array is empty
// otherwise maps through items array and creates a PlaceItem component for each item
const PlaceList = ({ items, onDeletePlace }) => {
  if (items.length === 0)
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Try creating one.</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );

  return (
    <ul className="place-list">
      {items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          desc={place.description}
          address={place.address}
          creatorId={place.creator}
          coords={place.location}
          onDelete={onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
