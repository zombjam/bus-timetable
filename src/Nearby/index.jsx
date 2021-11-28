import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { MenuBar, Desktop, Footer } from '../layout';
import { Map, PositionButton, SearchBar, BusMarker, LocationMarker, GPS_ICON } from '../components';
import StationList from './StationList';
import { fetchNearbyStationList } from '../store/nearby/index';

const Nearby = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();
  const position = useSelector(state =>
    !!state.search.currentPosition.length ? state.search.currentPosition : state.search.defaultPosition
  );

  const stationList = useSelector(state => state.nearby.stationList);

  const handleMarkerClick = (station, index) => {
    setActiveIndex(null);
  };

  const searchKeyword = useCallback(
    keyword => {
      const params = {
        $filter: `contains(StationName/Zh_tw, '${keyword}') or Stops/any(d:contains(d/RouteName/Zh_tw, '${keyword}'))`,
        position,
      };
      dispatch(fetchNearbyStationList(params));
    },
    [dispatch, position]
  );

  return (
    <Box display="flex" flexDirection="column" minH="full" position="relative" h="full" overflow="hidden">
      <MenuBar />
      <SearchBar onChange={val => searchKeyword(val)} />
      <PositionButton />
      {!activeIndex && <StationList />}

      <Desktop>
        <Footer />
      </Desktop>
      <Map>
        {!!position.length && <LocationMarker position={position} icon={GPS_ICON} title="目前的位置" alt="目前的位置"></LocationMarker>}
        {stationList.map((station, i) => (
          <BusMarker
            key={station.StationUID}
            position={[station.StationPosition.PositionLat, station.StationPosition.PositionLon]}
            onClickEvent={() => handleMarkerClick(station, i)}
            isActive={activeIndex === i}
            stopName={station.StationName}
          />
        ))}
      </Map>
    </Box>
  );
};

export default Nearby;
