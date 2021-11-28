import React, { useState, useEffect } from 'react';
import { Box, Button, Text, HStack, Slide, Tabs } from '@chakra-ui/react';
import { useSwipeable } from 'react-swipeable';
import { useSelector, useDispatch } from 'react-redux';
import { useIsMobile, useIsDesktop } from '../../hooks';
import { PositionButton, Icon, RefreshTimer } from '../../components';
import StationTab from '../StationTab';
import { fetchBusEstimatedTimeList } from '../../store/detail/index';

const ListStatus = {
  default: 'default',
  open: 'open',
  close: 'close',
};

const BusTimeline = ({ city, routeUID }) => {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const [listStatus, setListStatus] = useState(ListStatus.default);
  const [prevStatus, setPrevStatus] = useState();
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  const busInfo = useSelector(state => state.detail.busInfo);
  const dispatch = useDispatch();

  const handleSwipedUp = eventData => {
    if (listStatus === ListStatus.open) return;
    setPrevStatus(listStatus);
    setTimeout(() => {
      if (listStatus === 'default') {
        setListStatus(ListStatus.open);
      } else if (listStatus === 'close') {
        setListStatus(ListStatus.default);
      }
    }, 50);
  };

  const handleSwipedDown = eventData => {
    if (listStatus === ListStatus.close) return;
    setPrevStatus(listStatus);
    setTimeout(() => {
      if (listStatus === 'open') {
        setListStatus(ListStatus.default);
      } else if (listStatus === 'default') {
        setListStatus(ListStatus.close);
      }
    }, 50);
  };

  const handlers = useSwipeable({
    onSwipedUp: handleSwipedUp,
    onSwipedDown: handleSwipedDown,
  });

  useEffect(() => {
    if (!isMobile) {
      setListStatus('default');
    }
  }, [isMobile]);

  const handleListHeight = () => {
    if (!isMobile) {
      return 'calc(100% - 4rem)';
    }
    if (listStatus === ListStatus.close) {
      return '100px';
    }
    if (listStatus === ListStatus.open) {
      return `calc(var(--vh, 1vh) * 80)`;
    }
    return `calc(var(--vh, 1vh) * 50)`;
  };

  return (
    <Slide
      direction="bottom"
      in={prevStatus !== listStatus}
      unmountOnExit={true}
      style={{
        bottom: 0,
        zIndex: 1550,
        width: isMobile ? '100%' : isDesktop ? '25%' : '33.3333333%',
        height: isMobile ? 'auto' : '80%',
        display: 'inline-block',
        touchAction: 'pan-y',
      }}
    >
      {isMobile && listStatus !== ListStatus.open && <PositionButton top={{ base: -16 }} bottom={{}} />}
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
        <Box px={{ base: 5, md: 6 }}>
          <RefreshTimer onTimerChange={() => dispatch(fetchBusEstimatedTimeList({ city, routeUID }))} />
          <HStack justifyContent="space-between" alignItems="flex-start">
            <Text color="gray.800" fontSize="2xl" fontWeight="500">
              {busInfo?.RouteName}
            </Text>
            <Icon name="moreInfo" boxSize={6} />
          </HStack>
        </Box>
        <Tabs
          px={3}
          pb={12}
          colorScheme="primary"
          sx={{
            height: handleListHeight(),
          }}
        >
          {busInfo && <StationTab departureName={busInfo.DepartureStopName} destinationName={busInfo.DestinationStopName} />}
        </Tabs>
      </Box>
    </Slide>
  );
};

export default BusTimeline;
