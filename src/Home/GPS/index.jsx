import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { Box, VStack, Text, Button, HStack, Tag, List, ListItem, Link, Divider } from '@chakra-ui/react';
import { Footer } from '../../layout';
import { useIsMobile } from '../../hooks';
import { Icon, BusDuration } from '../../components';
import { fetchBusEstimateNearby, fetchNearbyStop } from 'store/bus/index';

const BusRoute = () => {
  const busList = useSelector(state => state.bus.nearbyList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBusEstimateNearby());
  }, [dispatch]);
  console.log('busList: ', busList);

  return (
    <List px={6} spacing={1.5} w="full" overflow="auto" h="full">
      {busList.map((item, i) => (
        <ListItem key={`${item.RouteUID}_${i}`}>
          <Link as={ReactLink} to="/detail" _hover={{}}>
            <HStack spacing={0} mb={1.5}>
              <BusDuration estimated={item.EstimateTime} stopStatus={item.StopStatus} statusName={item.StopStatusName} />
              <Box flex="1">
                <HStack spacing={3} pl={4}>
                  <Text fontWeight="700">{item.RouteName}</Text>
                </HStack>
                <Text color="gray.600" fontSize="sm" pl={4}>
                  開往 {(item.Direction === 0 && item.DestinationStopName) ?? ''}
                  {(item.Direction === 1 && item.DepartureStopName) ?? ''}
                </Text>
              </Box>
              <Icon name="arrow-right" />
            </HStack>
          </Link>
          <Divider w="96%" mx="auto" borderColor="#E0E0E0" />
        </ListItem>
      ))}
    </List>
  );
};

const NearbyBusStop = () => {
  const isMobile = useIsMobile();
  const nearbyStop = useSelector(state => state.bus.nearbyStop);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNearbyStop());
  }, [dispatch]);

  return (
    <Box
      flex="1"
      borderRadius="0 60px 0 0"
      pt={6}
      pb={{ base: 8, md: 12 }}
      bg={{ base: 'white', md: 'gray.200' }}
      shadow="base"
      position={{ base: 'relative', md: 'absolute' }}
      bottom={{ md: 0 }}
      w={{ md: 1 / 3, lg: 1 / 4 }}
      h={{ md: '80%' }}
      zIndex={{ md: 2000 }}
      alignItems="flex-start"
      overflow="hidden"
    >
      <Text color="gray.600" mb={1} pl={6}>
        最近站牌
      </Text>
      <Box pb={{ base: 8, md: 5 }} h="full">
        <HStack spacing={2} mb={2} pl={6}>
          {!!nearbyStop && <Text fontWeight="700">{nearbyStop.StopName}</Text>}
          {!!nearbyStop?.Bearing && (
            <Tag color="white" bg="gray.500" fontSize="xs" rounded="2xl">
              {nearbyStop.Bearing}
            </Tag>
          )}
        </HStack>
        <BusRoute />
      </Box>

      {isMobile && <Footer position="absolute" />}
    </Box>
  );
};

const GPS = () => {
  const isMobile = useIsMobile();
  const [isOpenGPS, setOpenGPS] = useState();

  return (
    <>
      {!isOpenGPS && (
        <VStack
          w={{ base: 'full', md: 96 }}
          textAlign="center"
          px={{ base: 4, md: 10 }}
          py={{ md: 6 }}
          spacing={5}
          bg={{ md: 'white' }}
          position={{ md: 'absolute' }}
          right={{ md: 0 }}
          bottom={{ md: 0 }}
          zIndex={{ md: 1050 }}
          mr={{ md: 2 }}
          rounded={{ md: '4px 4px 0 0' }}
        >
          <VStack spacing={1}>
            <Text fontWeight="700" fontSize={{ base: 'md', md: 'xl' }} textAlign={{ md: 'left' }}>
              開啟裝置定位功能，以便為您提供更好的服務。
            </Text>
            <Text fontSize="sm" color="primary.700">
              我們將用在提供您所在位置附近的交通等資訊。
            </Text>
          </VStack>

          <Button
            w="full"
            h="50px"
            variant="outline"
            color="primary.600"
            border="1px"
            borderColor="primary.600"
            rounded="3xl"
            onClick={() => setOpenGPS(true)}
            _hover={{ bg: 'rgba(238, 234, 249, 0.5)' }}
          >
            開啟定位功能
          </Button>
        </VStack>
      )}
      {!isOpenGPS && isMobile && <Footer />}
      {isOpenGPS && (
        <>
          <NearbyBusStop />
          {!isMobile && <Footer />}
        </>
      )}
    </>
  );
};

export default GPS;
