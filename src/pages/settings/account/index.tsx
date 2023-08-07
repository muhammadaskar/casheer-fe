import useDeviceCheck from '@/hooks/use-devicechek';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const mobile = useDeviceCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (mobile) {
      return navigate('/settings');
    }
    return navigate('/settings/account');
  }, [mobile, navigate]);

  return <div>Account</div>;
};

export default Account;
