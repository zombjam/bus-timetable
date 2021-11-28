import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Text, HStack, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { BusDuration } from '../../components';

const ButtonStyles = {
  color: 'gray.500',
  fontSize: 'sm',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '3px',
    borderRadius: '3px 3px 0 0',
  },
  '&[aria-selected=true]': {
    fontWeight: '500',
    color: 'gray.800',
  },
  '&[aria-selected=true]::after': {
    bg: 'primary.600',
  },
};

const suffixLine = {
  content: '""',
  position: 'absolute',
  top: 'calc(50%  + 5.5px)',
  right: '13px',
  width: '1px',
  height: 'calc(50% - 5.5px)',
  bg: '#E9ECEF',
};

const activeStyles = {
  bg: 'primary.600',
  borderColor: 'primary.600',
  '&:before': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '0',
    left: '-14px',
    top: '-2px',
    borderTop: '6px solid transparent',
    borderBottom: '6px solid transparent',
    borderRight: '10px solid transparent',
    borderLeft: '10px solid #37206D',
  },
};

const StationCard = ({ stop, index, isLast }) => {
  let activeIndx = null;

  return (
    <HStack
      spacing={0}
      pl={2}
      pr={4}
      py={4}
      borderBottom="1px"
      borderColor="gray.400"
      position="relative"
      sx={{ '&:after': isLast ? null : suffixLine, '&:before': !!index ? { ...suffixLine, top: 0 } : null }}
      cursor="pointer"
      _hover={{ bg: 'rgba(238, 234, 249, 0.5)' }}
    >
      {/* <HStack minW="60px" spacing={1} justifyContent="center">
        <Text fontSize="xl" fontWeight="500">
          2
        </Text>
        <Text>分</Text>
        <Tag color="white" bg="gray.500" fontSize="xs">
          末班已過
        </Tag>
      </HStack> */}
      <Box minW="85px">
        <BusDuration estimated={stop.EstimateTime} stopStatus={stop.StopStatus} statusName={stop.StopStatusName} />
      </Box>
      <Text pr={2}>
        {stop.StopSequence}. {stop.StopName}
      </Text>
      <Box
        position="absolute"
        w="11px"
        h="11px"
        border="1px"
        borderColor="gray.400"
        borderRadius="full"
        top="50%"
        zIndex={10}
        right={2}
        transform="translateY(-50%)"
        sx={activeIndx === index ? activeStyles : null}
      >
        {activeIndx === index ? (
          <Box
            bg="gradient.dark"
            fontSize="sm"
            position="absolute"
            right="26px"
            top="-11px"
            color="white"
            py="4px"
            pl="8px"
            pr="9px"
            w="max-content"
            borderRadius="16px"
          >
            059-V31
          </Box>
        ) : null}
      </Box>
    </HStack>
  );
};

const StationTab = ({ departureName, destinationName }) => {
  const [departureStation, destinationStation] = useSelector(state => {
    const busStops = state.detail.busStops;
    const estimatedData = state.detail.estimatedList;
    return busStops.map(station => {
      if (estimatedData?.length) {
        return {
          ...station,
          Stops: station.Stops.map(stop => {
            const mappingEstimated = estimatedData.find(estimated => estimated.StopUID === stop.StopUID);
            if (!mappingEstimated) {
              return stop;
            }
            let EstimateTime = null;
            if (mappingEstimated.EstimateTime != null) {
              EstimateTime = mappingEstimated.EstimateTime;
            } else if (!!mappingEstimated.Estimates?.length) {
              EstimateTime = mappingEstimated.Estimates.sort((a, b) => a.EstimateTime - b.EstimateTime)[0].EstimateTime;
            }
            return {
              ...stop,
              EstimateTime,
              StopStatus: mappingEstimated.StopStatus,
              StopStatusName: mappingEstimated.StopStatusName,
            };
          }),
        };
      }
      return station;
    });
  });

  return (
    <>
      <TabList borderColor="primary.200" mx={{ base: 2, md: 3 }}>
        <Tab flex="1" w={1 / 2} border="0" position="relative" sx={ButtonStyles}>
          {destinationName}
        </Tab>
        <Tab flex="1" w={1 / 2} border="0" position="relative" sx={ButtonStyles}>
          {departureName}
        </Tab>
      </TabList>

      <TabPanels h="full" overflow="auto">
        <TabPanel h="full" px={2} pt={1} pb={12}>
          {departureStation &&
            departureStation.Stops?.map((stop, indx, arr) => (
              <StationCard key={stop.StopUID} stop={stop} index={indx} isLast={indx === arr.length - 1} />
            ))}
        </TabPanel>
        <TabPanel h="full" px={2} pt={1} pb={12}>
          {destinationStation &&
            destinationStation.Stops?.map((stop, indx, arr) => (
              <StationCard key={stop.StopUID} stop={stop} index={indx} isLast={indx === arr.length - 1} />
            ))}
        </TabPanel>
      </TabPanels>
    </>
  );
};

export default StationTab;
