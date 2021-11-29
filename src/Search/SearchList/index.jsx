import React, { useState, useEffect } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { List, ListItem, Divider, Box, Text, HStack, Link } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '../../components';
import { saveHistory } from '../../store/search/index';

const SearchList = ({ isHistory }) => {
  const [list, setList] = useState([]);
  const cityBusList = useSelector((state) => state.search.cityBusList);
  const historyList = useSelector((state) => state.search.historyResult);
  const loading = useSelector((state) => state.search.loading);
  const dispatch = useDispatch();

  const onClickLink = (item) => {
    dispatch(saveHistory(item));
  };

  useEffect(() => {
    if (isHistory) {
      setList(historyList || []);
    } else {
      setList(cityBusList || []);
    }
  }, [isHistory, cityBusList, historyList]);

  return (
    <List spacing={1.5} mx={3} px={3} overflow="auto" h="full">
      {list?.map((bus) => (
        <ListItem key={bus.RouteUID}>
          <Link
            as={ReactLink}
            to={bus.City ? `/detail/${bus.City}/${bus.RouteUID}` : `/detail/InterCity/${bus.RouteUID}`}
            _hover={{}}
            onClick={() => onClickLink(bus)}
          >
            <HStack mb={1.5}>
              <Box flex="1">
                <HStack spacing={3} pl={isHistory ? '' : 7}>
                  {isHistory && <Icon name="clock" />}
                  <Text fontWeight="700">{bus.RouteName}</Text>
                </HStack>
                <Text color="gray.600" fontSize="sm" pl={7}>
                  {bus.DepartureStopName} - {bus.DestinationStopName}
                </Text>
              </Box>
              <HStack color="gray.600" fontSize="sm">
                <Text>{bus.CityName}</Text>
                <Icon name="arrow-right" />
              </HStack>
            </HStack>
          </Link>
          <Divider w="96%" mx="auto" borderColor="#E0E0E0" />
        </ListItem>
      ))}
      {!isHistory && loading === false && cityBusList?.length === 0 && (
        <Box textAlign="center" color="gray.500" pt={4} fontWeight="300">
          <Text>哎呀！查無結果</Text>
          <Text>請重新搜尋關鍵字或切換縣市</Text>
        </Box>
      )}
    </List>
  );
};

export default SearchList;
