import { useEffect, useState } from 'react';

const useDeviceCheck = () => {
  const [mobile, setMobile] = useState(window.innerWidth <= 500);

  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth <= 500);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return mobile;
};

export default useDeviceCheck;
