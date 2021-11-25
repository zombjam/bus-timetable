import React from 'react';
import { Box } from '@chakra-ui/react';

import { useIsMobile } from '../../hooks';

const Desktop = ({ children, ...styles }) => {
  const isMobile = useIsMobile();

  return !isMobile ? <Box {...styles}>{children}</Box> : null;
};

export default Desktop;
