import React from 'react';
import { Box } from '@chakra-ui/react';
import { MenuBar, Desktop, Footer } from '../layout';
import { Map, PositionButton, SearchBar } from '../components';

const Recommend = () => {
  return (
    <Box display="flex" flexDirection="column" minH="full" position="relative" h="full" overflow="hidden">
      <MenuBar />
      <SearchBar />
      <PositionButton />

      <Desktop>
        <Footer />
      </Desktop>
      <Map />
    </Box>
  );
};

export default Recommend;
