import React, { useState, useCallback } from 'react';
import { Box, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { MenuBar, Desktop, Footer } from '../layout';
import { Dropdown, Icon, Map } from '../components';
import SearchList from './SearchList';
import { debounce } from 'lodash-es';
import { useDispatch } from 'react-redux';
import { searchCityBusByKeyword, clearSearch } from '../store/search/index';

const Search = () => {
  const dispatch = useDispatch();
  const isOpenGPS = useSelector((state) => state.search.isOpenGPS);
  const [filter, setFilter] = useState({ city: '', keyword: '' });
  const request = debounce((filter) => dispatch(searchCityBusByKeyword(filter)), 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback((filter) => request(filter), []);

  const onChange = (key, value) => {
    setFilter((prevState) => ({ ...prevState, [key]: value }));
    debouncedSearch({ ...filter, [key]: value });
  };

  const clear = () => {
    onChange('keyword', '');
    dispatch(clearSearch());
  };

  return (
    <Box display="flex" flexDirection="column" h="full">
      <MenuBar />
      <Box
        position={{ md: 'absolute' }}
        bottom={{ md: '0' }}
        borderRadius={{ md: '0 60px 0 0 ' }}
        zIndex={{ md: 2000 }}
        w={{ base: 'full', md: 1 / 3, lg: 1 / 4 }}
        bg={{ md: 'gray.bg' }}
        shadow={{ md: 'base' }}
        h={{ md: '80%' }}
        overflow="hidden"
        display="flex"
        flexDirection="column"
      >
        <Box position="sticky" top="0" px={6} bg={{ base: 'gray.bg', md: 'transparent' }} zIndex={10}>
          <Box pt={{ base: 14, md: 7 }} w="80%">
            <Dropdown onDropdown={(city) => onChange('city', city)} />
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
                disabled={!filter.city}
                value={filter.keyword}
                onChange={(e) => onChange('keyword', e.target.value)}
              />
              <InputRightElement
                cursor={!filter.city ? 'not-allowed' : 'pointer'}
                my={1}
                children={<Icon name={!filter.keyword ? 'search' : 'close_circle'} size={6} />}
                onClick={() => filter.keyword && clear()}
              />
            </InputGroup>

            <Box color="gray.600" fontSize="sm" pt={6} pb={4}>
              {filter.keyword ? '搜尋結果' : '歷史搜尋'}
            </Box>
          </Box>
        </Box>
        <SearchList isHistory={!filter.keyword} />
      </Box>
      <Desktop>
        <Footer />
      </Desktop>
      <Desktop flex="1">
        <Map zoom={isOpenGPS ? 16 : 8}> </Map>
      </Desktop>
    </Box>
  );
};

export default Search;
