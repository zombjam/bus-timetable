import React, { useCallback } from 'react';
import { Marker } from 'react-leaflet';
import { BusMarkerIcon, BusActiveIcon } from '../Map/Icon';

const BusMarker = ({ position, isActive, onClickEvent }) => {
  const markerClicked = useCallback(() => {
    onClickEvent();
  }, [onClickEvent]);

  return <Marker position={position} icon={isActive ? BusActiveIcon : BusMarkerIcon} eventHandlers={{ click: markerClicked }}></Marker>;
};

export default BusMarker;
