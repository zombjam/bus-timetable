import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@chakra-ui/react';
import { MenuBar, Desktop, Footer } from '../layout';
import { Map, PositionButton, SearchBar, BusMarker } from '../components';
import StationList from './StationList';

const Nearby = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const stationList = useSelector(state => state.nearby.stationList);

  const handleMarkerClick = (station, index) => {
    // console.log('station: ', station);
    setActiveIndex(null);
  };

  return (
    <Box display="flex" flexDirection="column" minH="full" position="relative" h="full" overflow="hidden">
      <MenuBar />
      <SearchBar />
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
