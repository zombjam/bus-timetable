import React from 'react';
import { Box } from '@chakra-ui/react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import LocationMarker from '../LocationMarker';
import { GPS_ICON } from './Icon';

const Map = ({ zoom, center, children }) => {
  const position = [24.122771, 120.65154];
  return (
    <Box w="full" h="full">
      <MapContainer center={center || position} zoom={zoom || 16} zoomControl={false} style={{ height: '100%' }}>
        <TileLayer
          attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}"
        />
        {children}
        <LocationMarker position={position} icon={GPS_ICON} title="目前的位置" alt="目前的位置"></LocationMarker>
      </MapContainer>
    </Box>
  );
};

export default Map;
