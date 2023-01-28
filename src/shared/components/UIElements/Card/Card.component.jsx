import React from "react";

import "./Card.styles.css";

// Card Component
// receives props
// a custom stylized card component
// wraps children props in newly styled div
const Card = ({ className, style, children }) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;
