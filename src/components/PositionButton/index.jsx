import React from 'react';
import { IconButton, Tooltip, Box } from '@chakra-ui/react';
import Icon from '../Icon';

const PositionButton = () => {
  const getLocation = () => {
    if (!navigator.geolocation) {
      // toggleModal(true, '您的瀏覽器不支援地理定位功能');
      return;
    }
    // toggleModal(true, '定位中...');
    navigator.geolocation.getCurrentPosition(
      position => {
        // toggleModal(false, null);
        // setPosition([position.coords.latitude, position.coords.longitude]);
      },
      () => {
        // toggleModal(true, '無法檢索您的位置。');
      }
    );
  };

  return (
    <Box position="absolute" zIndex="1500" size={12} right={3} top="calc(76% - 56px)">
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
      {/* <Modal isOpen={modal.isOpen} content={modal.content} /> */}
    </Box>
  );
};

export default PositionButton;
