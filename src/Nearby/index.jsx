import React from 'react';
import { Box } from '@chakra-ui/react';
import MobileMenu from '../layout/MobileMenu';
import { Map, PositionButton, SearchBar } from '../components';
import StationList from './StationList';

const Nearby = () => {
  return (
    <Box display="flex" flexDirection="column" minH="full" position="relative" h="full">
      <MobileMenu />
      <SearchBar />
      <PositionButton />
      <StationList />
      <Map />
    </Box>
  );
};

export default Nearby;
