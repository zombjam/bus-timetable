import React, { useState, useEffect } from 'react';
import { Box, Button, Text, VStack, HStack, Tag, Slide } from '@chakra-ui/react';
import { useSwipeable } from 'react-swipeable';
import { useSelector, useDispatch } from 'react-redux';
import { useIsMobile, useIsDesktop } from '../../hooks';
import { fetchNearbyStationList } from '../../store/nearby/index';
import { Icon } from '../../components';

const StationCard = ({ station }) => {
  return (
    <Box w="full" px={3} py={2} border="1px" borderColor="primary.300" rounded="md">
      <HStack spacing={2} mb={1}>
        <Text fontWeight="700">{station?.StationName}</Text>
        <Tag justifyContent="center" whiteSpace="nowrap" minH="auto" py={1} color="white" bg="gray.500" fontSize="xs" rounded="2xl">
          {station?.BearingName}
        </Tag>
      </HStack>
      <Text color="primary.700" fontSize="sm">
        {station?.StopsList}
      </Text>
    </Box>
  );
};

const StationList = () => {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const [isOpen, setIsOpen] = useState(false);
  const position = useSelector(state => state.search.currentPosition);
  const dispatch = useDispatch();
  const stationList = useSelector(state => state.nearby.stationList);
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const handleSwipedUp = eventData => {
    setIsOpen(true);
  };

  const handleSwipedDown = eventData => {
    setIsOpen(false);
  };

  const handlers = useSwipeable({
    onSwipedUp: handleSwipedUp,
    onSwipedDown: handleSwipedDown,
    trackMouse: true,
  });

  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    dispatch(fetchNearbyStationList({ position }));
  }, [dispatch, position]);

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
      }}
    >
      <Button
        {...handlers}
        w="full"
        alignItems="flex-start"
        pt={2}
        h="27px"
        cursor="grab"
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
          ':active': {
            cursor: 'grabbing',
            bg: 'white',
          },
          ':focus': { borderColor: '', boxShadow: 'none' },
        }}
        _hover={{}}
      />
      <Box pt={{ md: 8 }} bg="white" rounded={{ md: '0 60px 0 0' }} overflow="hidden" h={{ md: 'full' }}>
        <Text color="gray.500" px={{ base: 5, md: 6 }} mb={3}>
          附近站牌
          <Icon name="BusStop" />
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
          {stationList.map(station => (
            <StationCard key={station.StationUID} station={station} />
          ))}
          {!stationList?.length && (
            <Text color="gray.500" textAlign="center" pt={6}>
              附近找不到站牌
            </Text>
          )}
        </VStack>
      </Box>
    </Slide>
  );
};

export default StationList;
