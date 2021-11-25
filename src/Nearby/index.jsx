import React from 'react';
import { Box } from '@chakra-ui/react';
import { MenuBar, Desktop, Footer } from '../layout';
import { Map, PositionButton, SearchBar } from '../components';
import StationList from './StationList';

const Nearby = () => {
  return (
    <Box display="flex" flexDirection="column" minH="full" position="relative" h="full" overflow="hidden">
      <MenuBar />
      <SearchBar />
      <PositionButton />
      <StationList />

      <Desktop>
        <Footer />
      </Desktop>
      <Map />
    </Box>
  );
};

export default Nearby;
