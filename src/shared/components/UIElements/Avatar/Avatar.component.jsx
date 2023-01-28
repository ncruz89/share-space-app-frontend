import React from "react";

import "./Avatar.styles.css";

// Avatar Component
// Component to handle User avatar styling
// receives various props
// returns a div containing user avatar with received props
const Avatar = ({ className, style, image, alt, width }) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width: width, height: width }} />
    </div>
  );
};

export default Avatar;
