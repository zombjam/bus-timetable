import React from 'react';
import { IconButton, Tooltip, Box } from '@chakra-ui/react';
import Icon from '../Icon';
import { useDispatch } from 'react-redux';
import { getGeolocation } from 'store/search/index';

/**
 *
 * @param bottom = { base: 5, md: 10 }
 */
const PositionButton = ({ top, bottom }) => {
  const dispatch = useDispatch();

  return (
    <Box
      position="absolute"
      zIndex="1010"
      boxSize={12}
      right={{ base: 3, md: 5 }}
      top={top}
      bottom={bottom || { base: '180px', md: '60px' }}
    >
      <Tooltip label="點擊定位" hasArrow bg="primary.600" color="white" mt={1}>
        <IconButton
          arial-label="點擊定位"
          isRound
          size="lg"
          bg="white"
          boxShadow="base"
          icon={<Icon name="positioning" w={5} h={7} />}
          _disabled={{ bg: 'gray.300' }}
          _hover={{}}
          _active={{}}
          _focus={{}}
          onClick={() => dispatch(getGeolocation())}
        />
      </Tooltip>
    </Box>
  );
};

export default PositionButton;
