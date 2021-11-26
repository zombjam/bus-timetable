import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Desktop, Header } from '../layout';
import { Map } from '../components';
import Nav from './components/Nav';
import GPS from './components/GPS';

const Home = () => {
  document.documentElement.classList.add('overflow-initial');

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove('overflow-initial');
    };
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      minH="full"
      position="relative"
      pt={{ base: 20, md: 0 }}
      h="full"
      overflow={{ md: 'hidden' }}
    >
      <Header />
      <Box display="flex" flexDirection="column" flex={{ base: '1', md: 'initial' }}>
        <Nav />
        <GPS />
      </Box>
      <Desktop flex="1">
        <Map zoom={8} center={[23.58, 120.58]} />
      </Desktop>
    </Box>
  );
};

export default Home;
