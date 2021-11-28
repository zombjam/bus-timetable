import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import LocationMarker from '../LocationMarker';
import { GPS_ICON } from './Icon';

const Map = ({ zoom, center, children }) => {
  const [map, setMap] = useState(null);
  const position = useSelector(state =>
    !!state.search.currentPosition.length ? state.search.currentPosition : state.search.defaultPosition
  );

  const loading = useSelector(state => state.search.geoLoading);

  useEffect(() => {
    if (map && loading === false && position.length) {
      map.flyTo(position, zoom);
    }
  }, [map, loading, position, zoom]);

  return (
    <Box w="full" h="full">
      <MapContainer center={center || position} zoom={zoom || 16} zoomControl={false} style={{ height: '100%' }} whenCreated={setMap}>
        <TileLayer
          attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}"
        />
        {children}
        {loading === false && <LocationMarker position={position} icon={GPS_ICON} title="目前的位置" alt="目前的位置"></LocationMarker>}
      </MapContainer>
    </Box>
  );
};

export default Map;
