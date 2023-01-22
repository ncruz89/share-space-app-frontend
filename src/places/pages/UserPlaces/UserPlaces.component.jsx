import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import PlaceList from "../../components/PlaceList/PlaceList.component";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal.component";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner.component";

const UserPlaces = () => {
  const [userPlaces, setUserPlaces] = useState([]);
  const { sendRequest, error, clearError, isLoading } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchUserPlaces = async () => {
      try {
        const userPlacesData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        console.log(userPlacesData);
        setUserPlaces(userPlacesData.userPlaces);
      } catch (error) {}
    };
    fetchUserPlaces();
  }, [sendRequest, userId]);

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
