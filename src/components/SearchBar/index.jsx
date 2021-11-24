import React from 'react';
import { IconButton, Box } from '@chakra-ui/react';
import Icon from '../Icon';

const SearchBar = () => {
  return (
    <Box position="absolute" zIndex="1500" boxSize={14} left={3} top={6}>
      <IconButton
        arial-label="搜尋"
        isRound
        boxSize="14"
        bg="white"
        boxShadow="base"
        icon={<Icon name="search" size={6} />}
        _disabled={{ bg: 'gray.300' }}
        _hover={{}}
        _active={{}}
        _focus={{}}
      />
    </Box>
  );
};

export default SearchBar;
