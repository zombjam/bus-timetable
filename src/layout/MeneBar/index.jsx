import React from 'react';
import Header from '../Header';
import MobileMenu from '../MobileMenu';
import { useIsMobile } from '../../hooks';

const MenuBar = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileMenu /> : <Header />;
};

export default MenuBar;
