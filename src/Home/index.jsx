import React from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { Desktop, Header, Footer } from '../layout';
import { Map, BusMarker } from '../components';
import Nav from './Nav';
import GPS from './GPS';
import { useIsMobile } from '../hooks';

const Home = () => {
  const isMobile = useIsMobile();
  const isOpenGPS = useSelector(state => state.search.isOpenGPS);
  const nearbyStop = useSelector(state => state.home.nearbyStop);

  return (
    <Box
      display="flex"
      flexDirection="column"
      minH="full"
      position="relative"
      pt={{ base: 20, md: 0 }}
      h="full"
      overflow={{ base: 'auto', md: 'hidden' }}
    >
      <Header />
      <Box display="flex" flexDirection="column" flex={{ base: '1', md: 'initial' }}>
        <Nav />
        <GPS />
      </Box>
      <Desktop flex="1">
        <Map zoom={isOpenGPS && !!nearbyStop ? 16 : 8}>
          {!!nearbyStop && <BusMarker position={[nearbyStop.StopPosition.PositionLat, nearbyStop.StopPosition.PositionLon]} />}
        </Map>
      </Desktop>
      {isMobile && !nearbyStop && <Footer />}
    </Box>
  );
};

export default Home;
