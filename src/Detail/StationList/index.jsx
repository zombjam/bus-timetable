import React, { useState, useEffect } from 'react';
import { Box, Button, Text, VStack, HStack, Slide, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useSwipeable } from 'react-swipeable';
import { useIsMobile, useIsDesktop } from '../../hooks';
import { PositionButton, Icon } from '../../components';

const StationCard = ({ children }) => {
  return (
    <TabPanel w="full" px={3} py={2}>
      <HStack spacing={2} mb={1}>
        Hello
      </HStack>
    </TabPanel>
  );
};

const ListStatus = {
  default: 'default',
  open: 'open',
  close: 'close',
};

const StationList = () => {
  const isMobile = useIsMobile();
  const isDesktop = useIsDesktop();
  const [listStatus, setListStatus] = useState(ListStatus.default);
  const [prevStatus, setPrevStatus] = useState();
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const handleSwipedUp = (eventData) => {
    if (listStatus === ListStatus.open) return;
    setPrevStatus(listStatus);
    setTimeout(() => {
      if (listStatus === 'default') {
        setListStatus(ListStatus.open);
      } else if (listStatus === 'close') {
        setListStatus(ListStatus.default);
      }
    }, 10);
  };

  const handleSwipedDown = (eventData) => {
    if (listStatus === ListStatus.close) return;
    setPrevStatus(listStatus);
    setTimeout(() => {
      if (listStatus === 'open') {
        setListStatus(ListStatus.default);
      } else if (listStatus === 'default') {
        setListStatus(ListStatus.close);
      }
    }, 10);
  };

  const handlers = useSwipeable({
    onSwipedUp: handleSwipedUp,
    onSwipedDown: handleSwipedDown,
    trackMouse: true,
  });

  useEffect(() => {
    if (!isMobile) {
      setListStatus('default');
    }
  }, [isMobile]);

  const handleListHeight = () => {
    if (!isMobile) {
      return '100%';
    }
    if (listStatus === ListStatus.close) {
      return '100px';
    }
    if (listStatus === ListStatus.open) {
      return `calc(var(--vh, 1vh) * 88)`;
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
          <HStack mb={1} spacing={2}>
            <Text fontSize="xs" color="gray.700">
              10秒後更新
            </Text>
            <Icon name="Refresh" />
          </HStack>
          <HStack justifyContent="space-between">
            <Text color="gray.800" fontSize="lg">
              100百貨幹線
            </Text>
            <Icon name="moreInfo" boxSize={6} />
          </HStack>
        </Box>
        <Tabs
          px={{ base: 5, md: 6 }}
          colorScheme="primary"
          sx={{
            height: handleListHeight(),
          }}
        >
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
          </TabList>

          <TabPanels>
            {/* <StationCard></StationCard>
            <StationCard></StationCard> */}
            <TabPanel>One !</TabPanel>
            <TabPanel>Two !</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Slide>
  );
};

export default StationList;
