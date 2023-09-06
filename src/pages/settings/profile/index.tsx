import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import useDeviceCheck from '@/hooks/use-devicechek';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
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
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
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
              <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                <p className="hidden md:block">Right click here</p>
                <Button
                  variant="ghost"
                  type="button"
                  className="block md:hidden"
                >
                  Upload image...
                </Button>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-64">
                <ContextMenuItem inset>
                  Back
                  <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset disabled>
                  Forward
                  <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset>
                  Reload
                  <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger inset>
                    More Tools
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-48">
                    <ContextMenuItem>
                      Save Page As...
                      <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                    <ContextMenuItem>Name Window...</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Developer Tools</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem checked>
                  Show Bookmarks Bar
                  <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem>
                  Show Full URLs
                </ContextMenuCheckboxItem>
                <ContextMenuSeparator />
                <ContextMenuRadioGroup value="pedro">
                  <ContextMenuLabel inset>People</ContextMenuLabel>
                  <ContextMenuSeparator />
                  <ContextMenuRadioItem value="pedro">
                    Pedro Duarte
                  </ContextMenuRadioItem>
                  <ContextMenuRadioItem value="colm">
                    Colm Tuite
                  </ContextMenuRadioItem>
                </ContextMenuRadioGroup>
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
    </>
  );
};

export default Profile;
