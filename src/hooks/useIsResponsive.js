import { useState, useEffect } from 'react';

const getIsMobile = () => window.innerWidth <= 768;
const getDesktop = () => window.innerWidth >= 992;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    const onResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return isMobile;
}

export function useIsDesktop() {
  const [isOverTablet, setIsOverTablet] = useState(getDesktop());

  useEffect(() => {
    const onResize = () => {
      setIsOverTablet(getDesktop());
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return isOverTablet;
}
