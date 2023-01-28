import React from "react";

import "./Spinner.styles.css";

// Spinner Component
// receives asOverlay prop
// if asOverlay prop exists then pinner class will activate and show spinner
const Spinner = ({ asOverlay }) => {
  return (
    <div className={`${asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring"></div>
    </div>
  );
};

export default Spinner;
