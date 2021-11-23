import React from 'react';
import { HStack, VStack, Img, Heading, Text, Link } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

import searchImg from '../../../assets/images/section-image01_m.png';
import nearbyImg from '../../../assets/images/section-image02_m.png';

const menus = [
  { name: '公車快找', desc: '直接輸入路線名稱獲得資訊！', path: '/search', img: searchImg },
  { name: '查詢站牌', desc: '附近站牌 / 公車動態及路線圖', path: '/nearby', img: nearbyImg },
];

const Nav = () => {
  return (
    <VStack spacing={6} mx={4} mt={10} mb={8} position="relative">
      {menus.map(menu => (
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
          >
            <VStack alignItems="flex-start" spacing={2}>
              <Heading as="h2" size="lg" fontWeight="500">
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
