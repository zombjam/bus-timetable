import React from 'react';
import { Box, Button, Text, VStack, HStack, Tag } from '@chakra-ui/react';

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
  return (
    <Box
      position="absolute"
      zIndex="1550"
      top="76%"
      w="full"
      h="full"
      rounded="12px 12px 0 0"
      bg="white"
      border="1px"
      borderColor="gray.300"
    >
      <Button
        w="full"
        alignItems="flex-start"
        pt={2}
        h="27px"
        sx={{
          '&:before': {
            content: '""',
            w: '40px',
            h: '2px',
            bg: 'gray.400',
          },
        }}
      />
      <Box px={4}>
        <Text color="gray.500" mb={3}>
          附近站牌
        </Text>
        <VStack spacing={3}>
          {[1, 2, 3].map(i => (
            <StationCard key={i}></StationCard>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default StationList;
