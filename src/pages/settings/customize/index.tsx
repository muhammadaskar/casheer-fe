/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import useDarkMode from '@/hooks/use-darkmode';
import useDeviceCheck from '@/hooks/use-devicechek';
import { useDarkModeStore } from '@/store/useDarkModeStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Customize = () => {
  const { darkMode } = useDarkModeStore();
  const { toggleDarkMode } = useDarkMode();
  const mobile = useDeviceCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (mobile) {
      return navigate('/settings');
    }
    return navigate('/settings/customize');
  }, [mobile, navigate]);

  return (
    <main className="space-y-6">
      <div className="hidden md:block">
        <h3 className="text-lg font-medium">Customize</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator className="hidden md:block" />
      <form className="space-y-8">
        <div className="space-y-2">
          <Label>App name</Label>
          <Input type="text" name="appname" placeholder="Casher App" />
          <p className="text-sm text-muted-foreground">
            This is your app name. It can be your real name or a pseudonym.
          </p>
        </div>

        <div className="space-y-2">
          <Label>App Icon</Label>
          <ContextMenu>
            <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </ContextMenuTrigger>

            <ContextMenuContent className="w-64">
              <ContextMenuItem inset>
                <Input
                  type="file"
                  id="picture"
                  className="border-0 text-white"
                />
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>

        <RadioGroup
          onValueChange={toggleDarkMode}
          defaultValue={darkMode}
          className="grid max-w-md grid-cols-2 gap-8 pt-2"
        >
          <Label>
            <div className="[&:has([data-state=checked])>div]:border-primary">
              <div>
                <RadioGroupItem value="light" className="sr-only" />
              </div>
              <div
                className={`items-center rounded-md border-2 ${
                  darkMode === 'light'
                    ? 'border-primary'
                    : 'border-muted hover:border-accent'
                } p-1 `}
              >
                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                    <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Light
              </span>
            </div>
          </Label>

          <Label>
            <div className="[&:has([data-state=checked])>div]:border-primary">
              <div>
                <RadioGroupItem value="dark" className="sr-only" />
              </div>
              <div
                className={`items-center rounded-md border-2 bg-popover p-1 ${
                  darkMode === 'dark'
                    ? 'border-primary'
                    : 'border-muted hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                  </div>
                </div>
              </div>
              <span className="block w-full p-2 text-center font-normal">
                Dark
              </span>
            </div>
          </Label>
        </RadioGroup>

        <Button variant="default" type="submit">
          Update preferences
        </Button>
      </form>
    </main>
  );
};

export default Customize;
