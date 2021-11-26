import React from 'react';
import { IconButton, Tooltip, Box } from '@chakra-ui/react';
import Icon from '../Icon';

/**
 *
 * @param bottom = { base: 5, md: 10 }
 */
const PositionButton = ({ top, bottom }) => {
  const getLocation = () => {
    if (!navigator.geolocation) {
      // toggleModal(true, '您的瀏覽器不支援地理定位功能');
      return;
    }
    // toggleModal(true, '定位中...');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // toggleModal(false, null);
        // setPosition([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        // toggleModal(true, '無法檢索您的位置。');
      }
    );
  };

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
          onClick={getLocation}
        />
      </Tooltip>
    </Box>
  );
};

export default PositionButton;
