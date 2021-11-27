import React, { useState, useRef, useEffect } from 'react';
import { HStack, Text } from '@chakra-ui/react';
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

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeLeft(10);
      onTimerChange();
    }
  }, [timeLeft, onTimerChange]);

  return (
    <HStack spacing={1}>
      <Text color="gray.700" fontSize="xs">
        {timeLeft}秒後更新
      </Text>
      <Icon name="Refresh" />
    </HStack>
  );
};

export default RefreshTimer;
