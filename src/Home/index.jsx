import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Nav from './components/Nav';
import GPS from './components/GPS';

const Home = () => {
  return (
    <Box display="flex" flexDirection="column" minH="full" position="relative">
      <Header />
      <Box flex="1" display="flex" flexDirection="column">
        <Nav />
        <GPS />
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
