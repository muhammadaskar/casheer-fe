import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Customize from './customize';
import Account from './account';
import Profile from './profile';
import { useState } from 'react';

const Settings = () => {
  const [value, setValue] = useState('Profile');

  return (
    <main className="px-2 py-2 pb-10 space-y-3 md:hidden">
      <h1 className="font-semibold tracking-tight text-2xl block md:hidden">
        {value}
      </h1>
      <p className="text-sm text-muted-foreground">
        This is for setting your profile and apps.
      </p>
      <Tabs className="block md:hidden space-y-3" defaultValue="profile">
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
