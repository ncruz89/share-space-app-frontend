import React, { useRef, useEffect } from "react";

import "./Map.styles.css";

// Map component
// receives multiple props
// creates a new instance of google's Javascript Map API
// uses useRef to create a ref of the object that holds the map
// sets center, zoom amount and marker position using props
// returns a styled and ref'd div that houses map instance
const Map = ({ className, style, center, zoom }) => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });

    new window.google.maps.Marker({ position: center, map });
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${className}`} style={style}></div>;
};

export default Map;
