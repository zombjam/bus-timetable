import React from 'react';
import { Box, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { MenuBar, Desktop, Footer } from '../layout';
import { Dropdown, Icon, Map } from '../components';
import SearchList from './SearchList';

const Search = () => {
  return (
    <Box display="flex" flexDirection="column" h="full">
      <MenuBar />
      <Box
        position={{ md: 'absolute' }}
        bottom={{ md: '0' }}
        borderRadius={{ md: '0 60px 0 0 ' }}
        zIndex={{ md: 2000 }}
        w={{ base: 'full', md: 'max-content' }}
        bg={{ md: 'gray.bg' }}
        shadow={{ md: 'base' }}
        maxH={{ md: '80%' }}
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        <Box position="sticky" top="0" px={6} bg={{ base: 'gray.bg', md: 'transparent' }} zIndex={10}>
          <Box pt={{ base: 14, md: 7 }} w="80%">
            <Dropdown />
          </Box>
          <Box mt={3}>
            <InputGroup size="lg" shadow="base">
              <Input
                h={14}
                bg="white"
                border="0"
                rounded="base"
                placeholder="請輸入公車路線 / 起迄站名"
                _focus={{
                  borderColor: 'primary.600',
                  boxShadow: '0 0 0 1px #7550CC',
                }}
              />
              <InputRightElement my={1} children={<Icon name="search" size={6} />} />
            </InputGroup>

            <Box color="gray.600" fontSize="sm" pt={6} pb={4}>
              歷史搜尋
            </Box>
          </Box>
        </Box>
        <SearchList isHistory />
      </Box>
      <Desktop>
        <Footer />
      </Desktop>
      <Desktop flex="1">
        <Map />
      </Desktop>
    </Box>
  );
};

export default Search;
