import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { List, ListItem, Divider, Box, Text, HStack, Link } from '@chakra-ui/react';
import { Icon } from '../../components';

const SearchList = ({ isHistory }) => {
  return (
    <List spacing={1.5} px={6}>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <ListItem key={i}>
          <Link as={ReactLink} to="/detail">
            <HStack mb={1.5}>
              <Box flex="1">
                <HStack spacing={3} pl={isHistory ? '' : 7}>
                  {isHistory && <Icon name="clock" />}
                  <Text fontWeight="700">8501</Text>
                </HStack>
                <Text color="gray.600" fontSize="sm" pl={7}>
                  義大世界 - 高雄左營站
                </Text>
              </Box>
              <HStack color="gray.600" fontSize="sm">
                <Text>高雄</Text>
                <Icon name="arrow-right" />
              </HStack>
            </HStack>
          </Link>
          <Divider w="96%" mx="auto" borderColor="#E0E0E0" />
        </ListItem>
      ))}
    </List>
  );
};

export default SearchList;
