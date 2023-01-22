import React from "react";

import UserItem from "../UserItem/UserItem.component";
import Card from "../../../shared/components/UIElements/Card/Card.component";

import "./UserList.styles.css";

const UserList = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found. Create one!</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {users.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.username}
            placeCount={user.places.length}
          />
        );
      })}
    </ul>
  );
};

export default UserList;
