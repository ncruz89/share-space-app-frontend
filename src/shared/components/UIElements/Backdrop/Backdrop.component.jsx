import React from "react";
import { createPortal } from "react-dom";

import "./Backdrop.styles.css";

// Backdrop component
// receives onClick prop
// returns a new portal instance hooked into the public index.html and renders backdrop div
const Backdrop = ({ onClick }) => {
  return createPortal(
    <div className="backdrop" onClick={onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
