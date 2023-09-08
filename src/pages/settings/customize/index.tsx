/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { useCasheerMutation } from '@/hooks/use-casheer';
import useDarkMode from '@/hooks/use-darkmode';
import useDeviceCheck from '@/hooks/use-devicechek';
import { useDarkModeStore } from '@/store/useDarkModeStore';
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

type CustomizeInputType = {
  name: string;
  image: string;
};

const Customize = () => {
  const [isImage, setImage] = useState<string>();
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useReducer(
    (current: CustomizeInputType, update: Partial<CustomizeInputType>) => ({
      ...current,
      ...update,
    }),
    {
      name: '',
      image: '',
    }
  );
  const { darkMode } = useDarkModeStore();
  const { toggleDarkMode } = useDarkMode();
  const storeInfoMutation = useCasheerMutation();
  const mobile = useDeviceCheck();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    convertToBase64(selectedFile);
    if (selectedFile) {
      setImage(selectedFile.name);
    }
  };

  const convertToBase64 = (file: any) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result as string;
        const getBase64 = base64Data.split('base64,')[1];

        setInput({
          image: getBase64,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    storeInfoMutation.mutate(input, {
      onSuccess: () => {
        toast({
          variant: 'default',
          description: 'Change appearance success',
        });
        setTimeout(() => window.location.reload(), 1000);
      },
    });
  };

  useEffect(() => {
    if (mobile) {
      return navigate('/settings');
    }
    return navigate('/settings/customize');
  }, [mobile, navigate]);

  return (
    <>
      <Helmet>
        <title>Customize Appearance</title>
      </Helmet>

      <main className="space-y-6">
        <div className="hidden sm:block">
          <h3 className="text-lg font-medium">Customize</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance of the app. Automatically switch between
            day and night themes.
          </p>
        </div>
        <Separator className="hidden sm:block" />
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>App name</Label>
            <Input
              type="text"
              name="appname"
              placeholder="Casher App"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  name: e.target.value,
                })
              }
            />
            <p className="text-sm text-muted-foreground">
              This is your app name. It can be your real name or a pseudonym.
            </p>
          </div>

          <div className="space-y-2">
            <Label>App Icon</Label>
            <ContextMenu>
              <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                {isImage === undefined ? (
                  <>
                    <p className="hidden sm:block">Right click here</p>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => imageInput.current?.click()}
                      className="block sm:hidden"
                    >
                      Upload image...
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="hidden sm:block">{isImage}</p>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => imageInput.current?.click()}
                      className="block sm:hidden"
                    >
                      {isImage}
                    </Button>
                  </>
                )}

                <Input
                  type="file"
                  ref={imageInput}
                  onChange={handleFileChange}
                  className="flex sm:hidden"
                  style={{ display: 'none' }}
                  id="picture"
                />
              </ContextMenuTrigger>

              <ContextMenuContent className="w-64">
                <div
                  className="relative flex cursor-default hover:bg-accent select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 space-x-2"
                  onClick={() => imageInput.current?.click()}
                >
                  Upload image...
                </div>
                <Input
                  type="file"
                  ref={imageInput}
                  onChange={handleFileChange}
                  className="hidden sm:flex"
                  style={{ display: 'none' }}
                  id="picture"
                />
              </ContextMenuContent>
            </ContextMenu>
            <p className="text-sm text-muted-foreground">
              The icon/logo png only.
            </p>
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
    </>
  );
};

export default Customize;
