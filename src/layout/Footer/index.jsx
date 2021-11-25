import React from 'react';
import { Box } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      position="absolute"
      bottom="0"
      left={{ base: 0, md: '354px' }}
      w={{ base: 'full', md: 'calc(100% - 354px)' }}
      fontSize="12px"
      textAlign={{ base: 'center', md: 'right' }}
      pr={{ md: 8 }}
      py={3}
      bg="primary.700"
      color="white"
      borderRadius="60px 0 0 0"
      zIndex="2000"
    >
      #The F2E 3rd Week3 #Design by breakfast
    </Box>
  );
};

export default Footer;
