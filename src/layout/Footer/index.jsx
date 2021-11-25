import React from 'react';
import { Box } from '@chakra-ui/react';

const Footer = ({ position }) => {
  return (
    <Box
      position={position || 'absolute'}
      bottom="0"
      left={{ base: 0, md: 'initial' }}
      right={{ md: 0 }}
      w={{ base: 'full', md: 2 / 3, lg: 3 / 4 }}
      fontSize="12px"
      textAlign={{ base: 'center', md: 'right' }}
      pr={{ md: 8 }}
      py={3}
      bg="primary.700"
      color="white"
      borderRadius="60px 0 0 0"
      zIndex="1001"
    >
      #The F2E 3rd Week3 #Design by breakfast
    </Box>
  );
};

export default Footer;
