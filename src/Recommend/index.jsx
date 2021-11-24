import React from 'react';
import { Box } from '@chakra-ui/react';
import MobileMenu from '../layout/MobileMenu';

const Recommend = () => {
  return (
    <Box display="flex" flexDirection="column" minH="full" position="relative">
      <MobileMenu />
    </Box>
  );
};

export default Recommend;
