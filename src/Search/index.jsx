import React from 'react';
import { Box, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import MobileMenu from '../layout/MobileMenu';
import { Dropdown, Icon } from '../components';
import SearchList from './SearchList';

const Search = () => {
  return (
    <Box display="flex" flexDirection="column" minH="full">
      <MobileMenu />
      <Box position="sticky" top="0" bg="gray.bg" zIndex={10} px={6}>
        <Box pt={14} w="80%">
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
  );
};

export default Search;
