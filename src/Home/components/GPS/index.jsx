import React, { useState } from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';

const GPS = () => {
  const [iaOpenGPS, setGPS] = useState(null);

  return (
    <>
      {!iaOpenGPS && (
        <VStack w="full" textAlign="center" px={4} spacing={5}>
          <VStack spacing={1}>
            <Text fontWeight="700" fontSize="md">
              開啟裝置定位功能，以便為您提供更好的服務。
            </Text>
            <Text fontSize="sm" color="primary.700">
              我們將用在提供您所在位置附近的交通等資訊。
            </Text>
          </VStack>

          <Button
            w="full"
            h="50px"
            variant="outline"
            color="primary.600"
            border="1px"
            borderColor="primary.600"
            rounded="3xl"
            onClick={() => setGPS(true)}
          >
            開啟定位功能
          </Button>
        </VStack>
      )}
      {iaOpenGPS && <Box flex="1" pb="42px" borderRadius="0 60px 0 0" px={6} pt={6} bg="white" shadow="base"></Box>}
    </>
  );
};

export default GPS;
