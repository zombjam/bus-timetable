import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { MenuBar, Desktop, Footer } from '../layout';
import { Map, PositionButton, SearchBar, BusMarker } from '../components';
import StationList from './StationList';
import { fetchNearbyStationList } from '../store/nearby/index';

const Nearby = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const dispatch = useDispatch();

  const stationList = useSelector(state => state.nearby.stationList);

  const handleMarkerClick = (station, index) => {
    setActiveIndex(null);
  };

  const searchKeyword = useCallback(
    keyword => {
      const params = {
        $filter: `contains(StationName/Zh_tw, '${keyword}') or Stops/any(d:contains(d/RouteName/Zh_tw, '${keyword}'))`,
      };
      dispatch(fetchNearbyStationList(params));
    },
    [dispatch]
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
        {stationList.map((station, i) => (
          <BusMarker
            key={station.StationUID}
            position={[station.StationPosition.PositionLat, station.StationPosition.PositionLon]}
            onClickEvent={() => handleMarkerClick(station, i)}
            isActive={activeIndex === i}
          />
        ))}
      </Map>
    </Box>
  );
};

export default Nearby;
