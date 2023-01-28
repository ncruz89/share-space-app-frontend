import React from "react";

import Modal from "../Modal/Modal.component";
import Button from "../../FormElements/Button/Button.component";

// ErrorModal component
// receives onClear and error props
// returns Modal component and passes on props and Button component to Modal Component
const ErrorModal = ({ onClear, error }) => {
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
