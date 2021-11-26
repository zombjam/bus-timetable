import React from 'react';
import { IconButton, Tooltip, Box } from '@chakra-ui/react';
import Icon from '../Icon';

const BackButton = () => {
  return (
    <Box position="absolute" zIndex="1010" boxSize={12} left={3} top={4}>
      <Tooltip label="返回" hasArrow bg="primary.600" color="white" mt={1}>
        <IconButton
          arial-label="返回"
          isRound
          size="lg"
          bg="white"
          boxShadow="base"
          icon={<Icon name="back" color="gray.800" w={5} h={7} />}
          _disabled={{ bg: 'gray.300' }}
          _hover={{}}
          _active={{}}
          _focus={{}}
        />
      </Tooltip>
    </Box>
  );
};

export default BackButton;
