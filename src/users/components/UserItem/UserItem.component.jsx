import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../../shared/components/UIElements/Avatar/Avatar.component";
import Card from "../../../shared/components/UIElements/Card/Card.component";

import "./UserItem.styles.css";

// UserItem component
// receives multiple props
// renders a user card that houses an avatar, name and their place count
// card also acts as a link to user places route
const UserItem = ({ id, image, name, placeCount }) => {
  return (
    <li className="user-item" id={id}>
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar
              image={`${process.env.REACT_APP_ASSET_URL}/${image}`}
              alt={name}
            />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
