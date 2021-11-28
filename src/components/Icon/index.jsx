import { Icon as ChakraIcon } from '@chakra-ui/icon';
import React from 'react';

import Icons from '../../assets/sprite.svg';

const Icon = ({ name, color, size, ...rest }) => {
  return (
    <ChakraIcon color={color} boxSize={size} {...rest}>
      <use xlinkHref={Icons + `#${name}`} fill="currentColor" style={{ width: '100%', height: '100%' }} />
    </ChakraIcon>
  );
};

export default Icon;
