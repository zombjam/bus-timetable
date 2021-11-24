import React from 'react';
import { Marker } from 'react-leaflet';

const LocationMarker = ({ position, icon, count, children, ...props }) => {
  return (
    <Marker position={position} icon={icon} {...props}>
      {children}
    </Marker>
    //
  );
};

export default LocationMarker;
