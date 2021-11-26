import React, { useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Box, VStack, Text, Button, HStack, Tag, List, ListItem, Link, Divider } from '@chakra-ui/react';
import { Footer } from '../../layout';
import { useIsMobile } from '../../hooks';
import { Icon } from '../../components';

const BusRoute = () => {
  return (
    <List px={6} spacing={1.5} w="full" overflow="auto" h="full">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16].map(i => (
        <ListItem key={i}>
          <Link as={ReactLink} to="/detail" _hover={{}}>
            <HStack mb={1.5}>
              <HStack spacing={1} ml={4}>
                <Text size="lg" fontWeight="bold">
                  3
                </Text>
                <Text color="gray.600">分</Text>
              </HStack>
              <Box flex="1">
                <HStack spacing={3} pl={4}>
                  <Text fontWeight="700">9117</Text>
                </HStack>
                <Text color="gray.600" fontSize="sm" pl={4}>
                  開往 小灣
                </Text>
              </Box>
              <Icon name="arrow-right" />
            </HStack>
          </Link>
          <Divider w="96%" mx="auto" borderColor="#E0E0E0" />
        </ListItem>
      ))}
    </List>
  );
};

const GPS = () => {
  const isMobile = useIsMobile();
  const [isOpenGPS, setOpenGPS] = useState();

  return (
    <>
      {!isOpenGPS && (
        <VStack
          w={{ base: 'full', md: 96 }}
          textAlign="center"
          px={{ base: 4, md: 10 }}
          py={{ md: 6 }}
          spacing={5}
          bg={{ md: 'white' }}
          position={{ md: 'absolute' }}
          right={{ md: 0 }}
          bottom={{ md: 0 }}
          zIndex={{ md: 1050 }}
          mr={{ md: 2 }}
          rounded={{ md: '4px 4px 0 0' }}
        >
          <VStack spacing={1}>
            <Text fontWeight="700" fontSize={{ base: 'md', md: 'xl' }} textAlign={{ md: 'left' }}>
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
            onClick={() => setOpenGPS(true)}
            _hover={{ bg: 'rgba(238, 234, 249, 0.5)' }}
          >
            開啟定位功能
          </Button>
        </VStack>
      )}
      {!isOpenGPS && isMobile && <Footer />}
      {isOpenGPS && (
        <>
          <Box
            flex="1"
            borderRadius="0 60px 0 0"
            pt={6}
            pb={{ base: 4, md: 12 }}
            bg={{ base: 'white', md: 'gray.200' }}
            shadow="base"
            position={{ md: 'absolute' }}
            bottom={{ md: 0 }}
            w={{ md: 1 / 3, lg: 1 / 4 }}
            h={{ md: '80%' }}
            zIndex={{ md: 2000 }}
            alignItems="flex-start"
            overflow="hidden"
          >
            <Text color="gray.600" mb={1} pl={6}>
              最近站牌
            </Text>
            <Box pb={{ base: 8, md: 5 }} h="full">
              <HStack spacing={2} mb={2} pl={6}>
                <Text fontWeight="700">捷運美麗島站</Text>
                <Tag color="white" bg="gray.500" fontSize="xs" rounded="2xl">
                  北行
                </Tag>
              </HStack>
              <BusRoute></BusRoute>
            </Box>
          </Box>
          <Footer position={isMobile ? 'static' : null} />
        </>
      )}
    </>
  );
};

export default GPS;
