import React from 'react';
import { Box, Text, HStack, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

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
  top: '50%',
  right: '13px',
  width: '1px',
  height: '50%',
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

const StationCard = ({ index, isLast }) => {
  let activeIndx = 2;

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
    >
      <HStack minW="60px" spacing={1} justifyContent="center">
        <Text fontSize="xl" fontWeight="500">
          2
        </Text>
        <Text>分</Text>
        {/* <Tag color="white" bg="gray.500" fontSize="xs">
          末班已過
        </Tag> */}
      </HStack>
      <Text pr={2}>{index + 1}. 瑞豐路(瑞隆路)</Text>
      <Box
        position="absolute"
        w="11px"
        h="11px"
        border="1px"
        borderColor="gray.400"
        borderRadius="full"
        top="50%"
        bg="white"
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

const StationTab = () => {
  return (
    <>
      <TabList borderColor="primary.200" mx={{ base: 2, md: 3 }}>
        <Tab flex="1" w={1 / 2} border="0" position="relative" sx={ButtonStyles}>
          One
        </Tab>
        <Tab flex="1" w={1 / 2} border="0" position="relative" sx={ButtonStyles}>
          Two
        </Tab>
      </TabList>

      <TabPanels h="full" overflow="auto">
        <TabPanel h="full" px={2} pt={1} pb={12}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((_, indx, arr) => (
            <StationCard key={indx} index={indx} isLast={indx === arr.length - 1} />
          ))}
        </TabPanel>
        <TabPanel h="full" px={2} pt={1} pb={12}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((_, indx, arr) => (
            <StationCard key={indx} index={indx} isLast={indx === arr.length - 1} />
          ))}
        </TabPanel>
      </TabPanels>
    </>
  );
};

export default StationTab;
