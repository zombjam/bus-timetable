import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MenuBar, Desktop, Footer } from '../layout';
import { Map, PositionButton, BackButton, BusStartIcon, BusEndIcon, BusMarker } from '../components';
import BusTimeline from './BusTimeline';
import { Polyline } from 'react-leaflet';

import { fetchBusStops, fetchBusShapes, fetchBusEstimatedTimeList } from '../store/detail/index';

const Detail = () => {
  const { city, routeUID } = useParams();
  const dispatch = useDispatch();
  const busShapes = useSelector((state) => state.detail.busShapes);
  const beginEndPositions = useSelector((state) =>
    state.detail.busStops?.reduce((stops, station, _, arr) => {
      const target = station.Stops[station.Stops.length - 1];
      stops.push({
        icon: station.Direction === 1 ? BusStartIcon : BusEndIcon,
        position: [target.StopPosition.PositionLat, target.StopPosition.PositionLon],
      });
      if (arr.length === 1) {
        const target = station.Stops[0];
        stops.push({
          icon: BusStartIcon,
          position: [target.StopPosition.PositionLat, target.StopPosition.PositionLon],
        });
      }
      return stops;
    }, [])
  );

  useEffect(() => {
    dispatch(fetchBusStops({ city, routeUID }));
    dispatch(fetchBusShapes({ city, routeUID }));
    dispatch(fetchBusEstimatedTimeList({ city, routeUID }));
  }, [dispatch, city, routeUID]);

  return (
    <Box display="flex" flexDirection="column" minH="full" position="relative" h="full" overflow="hidden">
      <MenuBar />
      <BackButton />
      <BusTimeline city={city} routeUID={routeUID} />
      <Desktop>
        <PositionButton />
      </Desktop>

      <Desktop>
        <Footer />
      </Desktop>
      {beginEndPositions?.length && (
        <Map zoom={14} center={beginEndPositions[0].position}>
          {beginEndPositions.map((stop, i) => (
            <BusMarker key={i} customIcon={stop.icon} position={stop.position} />
          ))}
          {busShapes?.length && <Polyline pathOptions={{ color: '#7550CC', weight: 5 }} positions={busShapes}></Polyline>}
        </Map>
      )}
    </Box>
  );
};
export default Detail;
