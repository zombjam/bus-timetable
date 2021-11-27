import React, { useCallback, useState } from 'react';
import debounce from 'lodash-es/debounce';
import { IconButton, Box, InputGroup, Input, InputRightElement, InputLeftElement } from '@chakra-ui/react';
import Icon from '../Icon';
import { useIsMobile } from '../../hooks';

const SearchBar = ({ onChange }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = useCallback(
    debounce(keyword => onChange(keyword), 800),
    [onChange]
  );

  const keywordChange = val => {
    setKeyword(val);
    handleChange(val);
  };

  return (
    <Box position="absolute" zIndex="1500" left={{ base: 3, md: 'initial' }} top={{ base: 6, md: 28 }} right={{ md: 8 }}>
      {!isOpen && (
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
          onClick={() => setIsOpen(true)}
        />
      )}
      <InputGroup
        display={{ base: !isOpen ? 'none' : 'block', md: 'block' }}
        size="lg"
        shadow="base"
        w={{ base: 80, md: 96 }}
        boxShadow="base"
        rounded="full"
      >
        <Input
          h={14}
          pl={{ base: 12, md: 8 }}
          pr={14}
          bg="white"
          border="0"
          rounded="full"
          placeholder="輸入路線或站名關鍵字"
          _focus={{
            borderColor: 'primary.600',
            boxShadow: '0 0 0 1px #7550CC',
          }}
          value={keyword}
          onChange={e => keywordChange(e.target.value)}
        />
        {isMobile && isOpen && (
          <InputLeftElement my={1} pl={3} cursor="pointer" children={<Icon name="back" boxSize={6} />} onClick={() => setIsOpen(false)} />
        )}
        <InputRightElement
          my={1}
          pr={3}
          cursor="pointer"
          children={<Icon name={!keyword ? 'search' : 'close_circle'} boxSize={6} />}
          onClick={() => !!keyword && keywordChange('')}
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
