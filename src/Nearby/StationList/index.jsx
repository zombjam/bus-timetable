import React, { useState, useEffect } from 'react';
import { useIsMobile, useIsDesktop } from '../../hooks';
import { Box, Button, Text, VStack, HStack, Tag, Slide } from '@chakra-ui/react';

const StationCard = () => {
  return (
    <Box px={3} py={2} border="1px" borderColor="primary.300" rounded="md">
      <HStack spacing={2} mb={1}>
        <Text fontWeight="700">捷運美麗島站</Text>
        <Tag color="white" bg="gray.500" fontSize="xs" rounded="2xl">
          北行
        </Tag>
      </HStack>
      <Text color="primary.700" fontSize="sm">
        100百貨幹線、12A、12C(延駛經大坪頂)、12B(去程不繞駛飛機路)、218A、218B、224(原
        24B)、52A、69A小港幹線、69B小港幹線(延駛明鳳)、72A、72B(延駛正勤社區)、8001
      </Text>
    </Box>
  );
};

const StationList = () => {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const [isOpen, setIsOpen] = useState(false);
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <Slide
      direction="bottom"
      in={isOpen}
      style={{
        bottom: !isOpen ? (isMobile ? '163px' : '80%') : 0,
        zIndex: 1550,
        width: isMobile ? 'auto' : isDesktop ? '25%' : '33.3333333%',
        height: isMobile ? 'auto' : '80%',
        display: 'inline-block',
        maxWidth: 'max-content',
      }}
    >
      <Button
        w="full"
        alignItems="flex-start"
        pt={2}
        h="27px"
        rounded="12px 12px 0 0"
        display={{ base: 'block', md: 'none' }}
        sx={{
          '&:before': {
            content: '""',
            display: 'block',
            m: '0 auto',
            w: '40px',
            h: '2px',
            bg: 'gray.400',
          },
        }}
        _hover={{}}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Box pt={{ md: 8 }} bg="white" rounded={{ md: '0 60px 0 0' }} overflow="hidden" h={{ md: 'full' }}>
        <Text color="gray.500" px={{ base: 5, md: 6 }} mb={3}>
          附近站牌
        </Text>
        <VStack
          px={{ base: 5, md: 6 }}
          spacing={3}
          overflow="auto"
          pb={{ base: 8, md: 16 }}
          sx={{
            height: isMobile ? (isOpen ? `calc(var(--vh, 1vh) * 88)` : '100px') : '100%',
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <StationCard key={i}></StationCard>
          ))}
        </VStack>
      </Box>
    </Slide>
  );
};

export default StationList;
