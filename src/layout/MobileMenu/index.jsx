import React from 'react';
import { Box, AspectRatio, Link, VStack, Text, useBoolean } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { MobileMenus } from '../../constant/menu';
import headMenuCloseImg from '../../assets/images/HeadMenu_mobile.svg';
import headMenuOpenImg from '../../assets/images/HeadMenu_open_mobile.svg';

const IconStyles = {
  bgPosition: 'center',
  bgRepeat: 'no-repeat',
  cursor: 'pointer',
};

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useBoolean();

  return (
    <>
      <Box position="fixed" zIndex="999" right="0" onClick={setIsOpen.toggle}>
        {isOpen && <Box boxSize="64px" alt="menu" {...IconStyles} bgImage={headMenuOpenImg} />}
        {!isOpen && <Box boxSize="64px" alt="menu-close" {...IconStyles} bgImage={headMenuCloseImg} />}
      </Box>
      {isOpen && (
        <Box position="absolute" top="0" left="0" zIndex="900" w="full" h="full" textAlign="right" bgColor="rgba(0,0,0, 0.3)">
          <Box
            display="inline-block"
            position="relative"
            overflow="hidden"
            m="0"
            w="235px"
            h="475px"
            pt="64px"
            borderRadius="0 0 0 180px"
            bg="gradient.normal"
            color="white"
          >
            <AspectRatio minW="200%" maxH="150%" ratio={1} position="absolute" top="64px" left="-10px">
              <Box
                sx={{
                  w: '441px',
                  h: '441px',
                  bgColor: 'rgba(255,255,255, 0.1)',
                  borderRadius: '50%',
                  zIndex: '1',
                  pointerEvents: 'none',
                }}
              ></Box>
            </AspectRatio>
            <VStack mt={10} alignItems="flex-end" maxH="80%" position="relative" zIndex="10">
              {MobileMenus.map(menu => (
                <Link
                  fontSize="xl"
                  h="52px"
                  lineHeight="52px"
                  w="full"
                  pr={10}
                  as={ReactLink}
                  key={menu.name}
                  to={menu.path}
                  letterSpacing="1px"
                  _hover={{ textDecoration: 'none' }}
                  onClick={setIsOpen.toggle}
                >
                  {menu.name}
                </Link>
              ))}
            </VStack>
            <Text mt={'30px !important'} borderTop="1px" borderColor="primary.200" fontSize="sm" pt={2} ml={12} mr={10} fontWeight="300">
              V1.0 By Breafast
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MobileMenu;
