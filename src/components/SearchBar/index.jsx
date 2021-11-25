import React from 'react';
import { IconButton, Box, InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import Icon from '../Icon';

const SearchBar = () => {
  return (
    <Box position="absolute" zIndex="1500" left={{ base: 3, md: 'initial' }} top={{ base: 6, md: 28 }} right={{ md: 8 }}>
      <IconButton
        arial-label="搜尋"
        isRound
        boxSize="14"
        bg="white"
        boxShadow="base"
        icon={<Icon name="search" size={6} />}
        _disabled={{ bg: 'gray.300' }}
        display={{ base: 'block', md: 'none' }}
        _hover={{}}
        _active={{}}
        _focus={{}}
      />
      <InputGroup display={{ base: 'none', md: 'block' }} size="lg" shadow="base" w={96} boxShadow="base" rounded="full">
        <Input
          h={14}
          pl={8}
          pr={14}
          bg="white"
          border="0"
          rounded="full"
          placeholder="輸入地址或關鍵字"
          _focus={{
            borderColor: 'primary.600',
            boxShadow: '0 0 0 1px #7550CC',
          }}
        />
        <InputRightElement my={1} pr={3} cursor="pointer" children={<Icon name="search" boxSize={6} />} />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
