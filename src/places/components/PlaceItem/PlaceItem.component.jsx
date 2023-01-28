import React, { Fragment, useState, useContext } from "react";

import Card from "../../../shared/components/UIElements/Card/Card.component";
import Button from "../../../shared/components/FormElements/Button/Button.component";
import Modal from "../../../shared/components/UIElements/Modal/Modal.component";
import Map from "../../../shared/components/UIElements/Map/Map.component";
import ErrorModal from "../../../shared/components/UIElements/ErrorModal/ErrorModal.component";
import Spinner from "../../../shared/components/UIElements/Spinner/Spinner.component";

import { AuthContext } from "../../../shared/Context/auth.context";

import { useHttpClient } from "../../../shared/hooks/http-hook";

import "./PlaceItem.styles.css";

// PlaceItem component
// receives multiple props
// handles showMap, confirmModal state
// uses useHttpClient custom hook

// returns react fragment that handles rendering error, map and confirm delete modals
// also renders place list item which houses place picture, title, description, address and map, edit and delete Buttons
const PlaceItem = ({
  image,
  title,
  address,
  desc,
  id,
  coords,
  onDelete,
  creatorId,
}) => {
  const { sendRequest, error, isLoading, clearError } = useHttpClient();
  const { userId, token } = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // open map handler - sets showMap state to true
  const openMapHandler = () => setShowMap(true);

  // close map handler - sets showMap state to false
  const closeMapHandler = () => setShowMap(false);

  // show delete warning handler - sets showConfirmModal to true
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  // cancel delete handler - sets showConfirmModal to false
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  // confirm delete handler - sets showConfirmModal to false
  // sends delete request for place to backend / authorization required
  // if successful runs onDelete callback and passes place id
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${id}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      onDelete(id);
    } catch (error) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={coords} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </Fragment>
        }
      >
        <p>Are you sure you want to delete this place?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <Spinner asOverlay />}
          <div className="place-item__image">
            <img
              src={`${process.env.REACT_APP_ASSET_URL}/${image}`}
              alt={title}
            />
          </div>
          <div className="place-item__info">
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{desc}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {userId === creatorId && <Button to={`/places/${id}`}>EDIT</Button>}
            {userId === creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </Fragment>
  );
};

export default PlaceItem;
