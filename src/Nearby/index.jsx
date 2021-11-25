import React from 'react';
import { Box } from '@chakra-ui/react';
import { MenuBar, Desktop, Footer } from '../layout';
import { Map, PositionButton, SearchBar } from '../components';
import StationList from './StationList';

const Nearby = () => {
  return (
    <Box display="flex" flexDirection="column" minH="full" position="relative" h="full">
      <MenuBar />
      <SearchBar />
      <PositionButton />
      <Box
        position={{ md: 'absolute' }}
        bottom={{ md: '0' }}
        borderRadius={{ md: '0 60px 0 0 ' }}
        zIndex={{ md: 2000 }}
        w={{ base: 'full', md: 'max-content' }}
        bg={{ md: 'gray.bg' }}
        shadow={{ md: 'base' }}
        maxH={{ md: '80%' }}
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        <StationList />
      </Box>

      <Desktop>
        <Footer />
      </Desktop>
      <Desktop flex="1">
        <Map />
      </Desktop>
    </Box>
  );
};

export default Nearby;
