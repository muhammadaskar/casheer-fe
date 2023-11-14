/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import useDeviceCheck from '@/hooks/use-devicechek';
import {
  useUserPhotoProfileMutation,
  useUserProfileMutation,
} from '@/hooks/use-user';
import { UserType } from '@/types/user-type';
import { Check, X } from 'lucide-react';
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

type ProfileInputType = {
  name: string;
  email: string;
};

const Profile = () => {
  const mobile = useDeviceCheck();
  const navigate = useNavigate();
  const [isImage, setImage] = useState<string>();
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [image, setImageInput] = useState<string>('');
  const userData: UserType = JSON.parse(
    localStorage.getItem('user-data') || ''
  );
  const [input, setInput] = useReducer(
    (current: ProfileInputType, update: Partial<ProfileInputType>) => ({
      ...current,
      ...update,
    }),
    {
      name: userData.name,
      email: userData.email,
    }
  );

  const profileUpdate = useUserProfileMutation();
  const profilePhoto = useUserPhotoProfileMutation();

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

        setImageInput(getBase64);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyPhoto = () => {
    profilePhoto.mutate(
      {
        image,
      },
      {
        onSuccess: () => {
          toast({
            variant: 'default',
            description: 'Update photo success',
          });
        },

        onError: (err: any) => {
          toast({
            variant: 'destructive',
            description: err.response?.data?.meta?.message,
          });
        },
      }
    );
    setImage(undefined);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // profileUpdate.mutate(input);

    profileUpdate.mutate(input, {
      onSuccess: () => {
        localStorage.setItem(
          'user-data',
          JSON.stringify({
            email: input.email,
            name: input.name,
          })
        );
        toast({
          variant: 'default',
          description: 'Update profile success',
        });
        setTimeout(() => window.location.reload(), 1000);
      },

      onError: (err: any) => {
        toast({
          variant: 'destructive',
          description: err.response?.data?.meta?.message,
        });
      },
    });
  };

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
        <div className="hidden sm:block">
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator className="hidden sm:block" />
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label>Your Name</Label>
            <Input
              type="text"
              name="Name"
              defaultValue={userData.name}
              placeholder={userData.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  name: event.target.value,
                })
              }
            />
            <p className="text-sm text-muted-foreground">
              This is your public display name. It can be your real name or a
              pseudonym.
            </p>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              defaultValue={userData.email}
              placeholder={userData.email}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setInput({
                  email: event.target.value,
                })
              }
            />
            <p className="text-sm text-muted-foreground">
              You can manage verified email addresses in your email settings.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Profile picture</Label>
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
                    <div className="flex flex-col items-center space-y-3">
                      <p>{isImage}</p>
                      <div className="flex space-x-4">
                        <Button
                          variant={'outline'}
                          className="space-x-2"
                          type="button"
                          onClick={() => setImage(undefined)}
                        >
                          <X className="w-4 h-4 text-red-500" />
                          <p>Delete</p>
                        </Button>
                        <Button
                          variant={'outline'}
                          className="space-x-4"
                          type="button"
                          onClick={applyPhoto}
                        >
                          <Check className="w-4 h-4 text-green-500" />
                          <p>Apply</p>
                        </Button>
                      </div>
                    </div>
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
