import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ zoom, center, children }) => {
  const [map, setMap] = useState(null);
  const position = useSelector((state) =>
    !!state.search.currentPosition.length ? state.search.currentPosition : state.search.defaultPosition
  );

  const loading = useSelector((state) => state.search.geoLoading);

  useEffect(() => {
    if (map && loading === false) {
      if (center?.length) {
        map.flyTo(center, zoom);
      } else if (position.length) {
        map.flyTo(position, zoom);
      }
    }
  }, [map, loading, center, position, zoom]);

  return (
    <Box w="full" h="full">
      <MapContainer
        center={center?.length ? center : position}
        zoom={zoom || 16}
        zoomControl={false}
        style={{ height: '100%' }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}"
        />
        {children}
      </MapContainer>
    </Box>
  );
};

export default Map;
