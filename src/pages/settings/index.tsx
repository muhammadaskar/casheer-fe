import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Customize from './customize';
import Account from './account';
import Profile from './profile';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDeviceCheck from '@/hooks/use-devicechek';

const Settings = () => {
  const [value, setValue] = useState('Profile');
  const mobile = useDeviceCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (mobile) {
      return navigate('/settings');
    }
    return navigate('/settings/profile');
  }, [mobile, navigate]);

  return (
    <main className="px-2 py-2 pb-10 space-y-3 sm:hidden">
      <h1 className="font-semibold tracking-tight text-2xl block sm:hidden">
        {value}
      </h1>
      <p className="text-sm text-muted-foreground">
        This is for setting your profile and apps.
      </p>
      <Tabs className="block sm:hidden space-y-3" defaultValue="profile">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="profile" onClick={() => setValue('Profile')}>
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" onClick={() => setValue('Account')}>
            Account
          </TabsTrigger>
          <TabsTrigger value="customize" onClick={() => setValue('Customize')}>
            Customize
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Profile />
        </TabsContent>
        <TabsContent value="account">
          <Account />
        </TabsContent>
        <TabsContent value="customize">
          <Customize />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Settings;
