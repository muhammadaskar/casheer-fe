import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import useDeviceCheck from '@/hooks/use-devicechek';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const mobile = useDeviceCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (mobile) {
      return navigate('/settings');
    }
    return navigate('/settings/profile');
  }, [mobile, navigate]);

  return (
    <main className="space-y-6">
      <div className="hidden md:block">
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator className="hidden md:block" />
      <form className="space-y-8">
        <div className="space-y-2">
          <Label>Username</Label>
          <Input type="text" name="username" placeholder="casherapp" />
          <p className="text-sm text-muted-foreground">
            This is your public display name. It can be your real name or a
            pseudonym. You can only change this once every 30 days.
          </p>
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" name="email" placeholder="casherapp@mail.com" />
          <p className="text-sm text-muted-foreground">
            You can manage verified email addresses in your email settings.
          </p>
        </div>

        <div className="space-y-2">
          <Label>Profile picture</Label>
          <ContextMenu>
            <ContextMenuTrigger className="h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm hidden md:flex">
              Right click here
            </ContextMenuTrigger>
            <ContextMenuTrigger className="h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm flex md:hidden">
              <Button variant="ghost">Browse Here</Button>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
              <ContextMenuItem inset>Upload picture</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <p className="text-sm text-muted-foreground">
            You can change profile picture with right click.
          </p>
        </div>
        <Button variant="default" type="submit">
          Update account
        </Button>
      </form>
    </main>
  );
};

export default Profile;
