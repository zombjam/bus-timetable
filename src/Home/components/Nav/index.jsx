import React from 'react';
import { HStack, VStack, Img, Heading, Text, Link } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

import { HomeNavMenus } from '../../../constant/menu';

const Nav = () => {
  return (
    <VStack
      spacing={6}
      ml={{ base: 'auto', md: 0 }}
      mr={{ base: 'auto', md: 2 }}
      px={{ base: 6, md: 0 }}
      mt={{ base: 10, md: 0 }}
      mb={{ base: 8, md: 0 }}
      w={{ base: 'full', md: 96 }}
      position={{ base: 'relative', md: 'absolute' }}
      top={{ md: 32 }}
      right={{ md: 0 }}
      zIndex={{ md: 1050 }}
    >
      {HomeNavMenus.map(menu => (
        <HStack spacing="0" shadow="base" w="full" bg="white" rounded="md" key={menu.name}>
          <Img
            src={menu.img}
            m="0"
            position="absolute"
            pointerEvents="none"
            right={{ base: 3, md: -2 }}
            minW={32}
            minH={24}
            alt={menu.name}
          />
          <Link
            as={ReactLink}
            flexDirection="column"
            justifyContent="space-between"
            to={menu.path}
            w="full"
            p={4}
            position="relative"
            zIndex="2"
            _hover={{ textDecoration: 'none' }}
          >
            <VStack alignItems="flex-start" spacing={2}>
              <Heading as="h2" size="lg">
                {menu.name}
              </Heading>
              <Text color="gray.600" fontSize="sm">
                {menu.desc}
              </Text>
            </VStack>
          </Link>
        </HStack>
      ))}
    </VStack>
  );
};

export default Nav;
