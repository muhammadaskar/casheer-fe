import { useEffect, useState } from 'react';

const useDeviceCheck = () => {
  const [mobile, setMobile] = useState(window.innerWidth <= 639);

  const handleWindowSizeChange = () => {
    setMobile(window.innerWidth <= 639);
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
