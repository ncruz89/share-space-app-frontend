import React, { Fragment, useEffect, useState } from "react";

import UserList from "../../components/UserList/UserList.component";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal.component";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner.component";
import { useHttpClient } from "../../../shared/hooks/http-hook";

// Users component
// handles loadedUsers state
// utilizes custom hook useHttpClient to request all users from database on initialization.
// renders UserList component if isLoading is false and loadedUsers exists
const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );

        setLoadedUsers(data.users);
      } catch (error) {}
    };

    fetchUsers();
  }, [sendRequest]);

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <Spinner />
        </div>
      )}

      {!isLoading && loadedUsers && <UserList users={loadedUsers} />}
    </Fragment>
  );
};

export default Users;
