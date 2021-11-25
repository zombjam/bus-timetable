import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Box, Img, AspectRatio, HStack, Heading, Text, Link } from '@chakra-ui/react';
import { HomeNavMenus } from '../../constant/menu';

import logo from '../../assets/images/header-logo.png';
import quarter from '../../assets/images/header-quarter.png';

const Header = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      borderRadius={{ base: '0 0 0 60px', md: '0 0 0 45px' }}
      px={4}
      pt={{ base: 0.5, md: '7px' }}
      pb={3}
      pr={{ md: 16 }}
      bg="gradient.deep"
      position="relative"
    >
      <AspectRatio maxW={{ base: 20, md: '60px' }} ratio={1} flex="1">
        <Link as={ReactLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Img src={logo} m="0" />
        </Link>
      </AspectRatio>
      <Box
        display="flex"
        pl={{ base: 0, md: 8 }}
        pr={2}
        flexDirection="column"
        alignItems={{ base: 'flex-end', md: 'flex-start' }}
        color="white"
        flex="1"
      >
        <Heading as="h1" fontSize={{ base: '30px', md: '24px' }}>
          <Link as={ReactLink} to="/" _hover={{ textDecoration: 'none' }}>
            機智公車族+
          </Link>
        </Heading>
        <Text fontWeight="300" fontSize="sm" mt={0.5}>
          全台公車動態時刻查詢應用服務
        </Text>
      </Box>

      <HStack display={{ base: 'none', md: 'flex' }} spacing={4}>
        {HomeNavMenus.map((menu) => (
          <Link
            as={ReactLink}
            to={menu.path}
            key={menu.name}
            border="2px"
            rounded="md"
            color="white"
            fontSize="lg"
            borderColor="transparent"
            px={4}
            py={3}
            _hover={{ textDecoration: 'none', borderColor: 'secondary.yellow' }}
          >
            {menu.name}
          </Link>
        ))}
      </HStack>

      <Img src={quarter} position="absolute" bottom="0" right="0" />
    </Box>
  );
};

export default Header;
