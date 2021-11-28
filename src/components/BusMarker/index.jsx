import React, { useCallback } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { BusMarkerIcon, BusActiveIcon } from '../Map/Icon';

const BusMarker = ({ position, isActive, onClickEvent, stopName }) => {
  const markerClicked = useCallback(() => {
    onClickEvent();
  }, [onClickEvent]);

  return (
    <Marker position={position} icon={isActive ? BusActiveIcon : BusMarkerIcon} eventHandlers={{ click: markerClicked }}>
      {stopName && (
        <Tooltip direction="top" offset={[0, -20]}>
          {stopName}
        </Tooltip>
      )}
    </Marker>
  );
};

export default BusMarker;
