import React from 'react';
import { Box, Img, AspectRatio, Heading, Text } from '@chakra-ui/react';

import logo from '../../assets/images/header-logo.png';
import quarter from '../../assets/images/header-quarter.png';

const Header = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderRadius="0 0 0 60px"
      px={4}
      pt="2px"
      pb={3}
      bg="gradient.deep"
      position="relative"
    >
      <AspectRatio maxW={20} ratio={1} flex="1">
        <Img src={logo} m="0" />
      </AspectRatio>
      <Box display="flex" pr={2} flexDirection="column" alignItems="flex-end" color="white">
        <Heading as="h1" size="lg">
          機智公車族+
        </Heading>
        <Text fontWeight="300" fontSize="sm" mt={0.5}>
          全台公車動態時刻查詢應用服務
        </Text>
      </Box>

      <Img src={quarter} position="absolute" bottom="0" right="0" />
    </Box>
  );
};

export default Header;
