import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import PlaceList from "../../components/PlaceList/PlaceList.component";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal.component";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner.component";

// UserPlaces Component
// handles userPlaces state
// uses useHttpClient custom hook
// renders PlaceList component when isLoading is false and userPlaces exists
const UserPlaces = () => {
  const [userPlaces, setUserPlaces] = useState([]);
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const userId = useParams().userId;

  // useEffect which calls to backend to retrieve userPlacesData and sets UserPlaces with retrieved data
  // reruns on userId update
  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const userPlacesData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );

        setUserPlaces(userPlacesData.userPlaces);
      } catch (error) {}
    };
    fetchUserPlaces();
  }, [sendRequest, userId]);

  // deletePlace Handler
  // receives deletedPlaceId parameter
  // sets userPlaces by filtering out deleted place
  const deletedPlaceHandler = (deletedPlaceId) => {
    setUserPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <Spinner />
        </div>
      )}
      {!isLoading && userPlaces && (
        <PlaceList items={userPlaces} onDeletePlace={deletedPlaceHandler} />
      )}
    </Fragment>
  );
};

export default UserPlaces;
