import React from 'react';
import { HStack, VStack, Img, Heading, Text, Link } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

import { HomeNavMenus } from '../../../constant/menu';

const Nav = () => {
  return (
    <VStack spacing={6} mx={4} mt={10} mb={8} position="relative">
      {HomeNavMenus.map((menu) => (
        <HStack spacing="0" shadow="base" w="full" bg="white" rounded="md" key={menu.name}>
          <Img src={menu.img} m="0" position="absolute" pointerEvents="none" right={-2} minW={32} minH={24} alt={menu.name} />
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
