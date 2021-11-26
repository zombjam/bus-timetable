import React from 'react';
import { Box } from '@chakra-ui/react';
import { MenuBar, Desktop, Footer } from '../layout';
import { Map, PositionButton, BackButton } from '../components';
import StationList from './StationList';

const Detail = () => {
  return (
    <Box display="flex" flexDirection="column" minH="full" position="relative" h="full" overflow="hidden">
      <MenuBar />
      <BackButton />
      <StationList />
      <Desktop>
        <PositionButton />
      </Desktop>

      <Desktop>
        <Footer />
      </Desktop>
      <Map />
    </Box>
  );
};
export default Detail;
