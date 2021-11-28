import React, { useState, useRef, useEffect, useCallback } from 'react';
import { HStack, Box, Text } from '@chakra-ui/react';
import Icon from '../Icon';

const RefreshTimer = ({ onTimerChange }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const clickRefresh = useCallback(() => {
    setTimeLeft(10);
    onTimerChange();
  }, [onTimerChange]);

  useEffect(() => {
    if (timeLeft <= 0) {
      clickRefresh();
    }
  }, [timeLeft, clickRefresh]);

  return (
    <HStack spacing={1}>
      <Box display="flex" color="gray.700" fontSize="xs">
        <Text minW={3.5} textAlign="center">
          {timeLeft}
        </Text>
        秒後更新
      </Box>
      <Icon name="Refresh" cursor="pointer" onClick={() => clickRefresh()} />
    </HStack>
  );
};

export default RefreshTimer;
