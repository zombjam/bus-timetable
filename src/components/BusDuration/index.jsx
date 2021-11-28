import React from 'react';
import { Text, HStack, Tag } from '@chakra-ui/react';
import { format, addSeconds } from 'date-fns';

const getTimeFormat = seconds => {
  let time, minutes;
  if (!isNaN(seconds)) {
    if (seconds >= 1800) {
      const now = new Date();
      time = format(addSeconds(now, seconds), 'HH:mm');
    } else if (seconds >= 60) {
      minutes = Math.floor(seconds / 60);
    } else {
      time = '進站中';
    }
  }

  return { time, minutes };
};

const BusDuration = ({ estimated, stopStatus, statusName }) => {
  const { time, minutes } = getTimeFormat(estimated);

  return (
    <HStack spacing={1} w="76px" justifyContent="center">
      {stopStatus === 0 ? (
        <>
          <Text size="lg" fontWeight="bold" color={estimated <= 60 ? 'status.error' : null}>
            {minutes}
            {time}
          </Text>
          {!!minutes && <Text color={estimated <= 60 ? 'status.error' : 'gray.600'}>分</Text>}
        </>
      ) : (
        <Tag color="white" bg="gray.500" fontSize="xs">
          {statusName}
        </Tag>
      )}
    </HStack>
  );
};

export default BusDuration;
