import React, { useCallback } from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import { BusMarkerIcon, BusActiveIcon } from '../Map/Icon';

const BusMarker = ({ position, isActive, customIcon, onClickEvent, stopName }) => {
  const markerClicked = useCallback(() => {
    if (onClickEvent) {
      onClickEvent();
    }
  }, [onClickEvent]);

  return (
    <Marker position={position} icon={customIcon || (isActive ? BusActiveIcon : BusMarkerIcon)} eventHandlers={{ click: markerClicked }}>
      {stopName && (
        <Tooltip direction="top" offset={[0, -20]}>
          {stopName}
        </Tooltip>
      )}
    </Marker>
  );
};

export default BusMarker;
