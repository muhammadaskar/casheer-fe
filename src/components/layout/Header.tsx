/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BellIcon,
  LogOut,
  Mail,
  Moon,
  PlusCircle,
  Settings,
  Sun,
  UserPlus,
  Users,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

import { Button } from '../ui/button';
import { FC, useState } from 'react';
import { UserParseType, UserType } from '@/types/user-type';
import { Badge } from '../ui/badge';
// import useNotification from '@/hooks/use-notification';
import { useNavigate } from 'react-router-dom';
import {
  useNotificationMutation,
  useNotificationQuery,
} from '@/hooks/use-notification';
import { NotificationType } from '@/types/notification-type';
import { ScrollArea } from '../ui/scroll-area';
import { useCasheerInfoQuery } from '@/hooks/use-casheer';
import { Skeleton } from '../ui/skeleton';
import { useUserPhotoQuery } from '@/hooks/use-user';

type HeaderProps = {
  mode: string | null;
  toggle: () => void;
};

const Header: FC<HeaderProps> = ({ mode, toggle }) => {
  const navigate = useNavigate();
  const { data } = useNotificationQuery();
  const { data: userPhoto } = useUserPhotoQuery();
  const { data: storeInfo, status } = useCasheerInfoQuery();
  const [notifId, setNotifId] = useState(0);
  const [read, setRead] = useState(true);

  const notificationMutation = useNotificationMutation(notifId);
  const notification: NotificationType[] = data?.data;

  const userDataParse: UserParseType = JSON.parse(
    localStorage.getItem('user-data-parse') || ''
  );
  const userData: UserType = JSON.parse(
    localStorage.getItem('user-data') || ''
  );

  const truncate = (str: string, max: number, len: number) => {
    return str.length > max ? str.substring(0, len) + '...' : str;
  };

  const notificationRead = () => {
    if (read == true) {
      return notificationMutation.mutate({
        is_read: 0,
      });
    }
  };

  return (
    <div className="fixed w-full bg-background z-50">
      <div className="border-b border-t flex justify-between items-center px-3 md:px-5 py-1 top-0">
        {status !== 'loading' ? (
          <div
            className="flex items-center space-x-2 hover:cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img
              className="h-6 w-auto"
              src={storeInfo?.data.Image}
              alt="Casheer APP"
            />
            <h1 className="font-semibold text-lg tracking-tighter ">
              {storeInfo?.data.Name}
            </h1>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        )}

        <div className="flex space-x-3 flex-row items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Button
                  variant="outline"
                  className="relative h-8 w-8"
                  size="icon"
                >
                  <BellIcon className="h-[1.2rem] w-[1.2rem]" />

                  {userDataParse.role === 0 ? (
                    notification?.filter((item) => item.is_read == true)
                      .length ? (
                      <Badge className=" absolute z-20 bg-red-500 h-5 w-1 text-xs top-[-0.25rem] text-white items-center justify-center left-5 hover:bg-red-500/80">
                        {
                          notification?.filter((item) => item.is_read == true)
                            .length
                        }
                      </Badge>
                    ) : null
                  ) : notification?.filter(
                      (item) => item.is_read == true && item.type === 2
                    ).length ? (
                    <Badge className=" absolute z-20 bg-red-500 h-5 w-1 text-xs top-[-0.25rem] text-white items-center justify-center left-5 hover:bg-red-500/80">
                      {
                        notification?.filter(
                          (item) => item.is_read == true && item.type === 2
                        ).length
                      }
                    </Badge>
                  ) : null}
                </Button>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Notification</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-52">
                {userDataParse.role === 0
                  ? notification
                      ?.sort((a, b) => b.id - a.id)
                      .map((item) => (
                        <DropdownMenuItem
                          key={item.id}
                          onClick={() => {
                            setNotifId(item.id);
                            setRead(item.is_read);
                            notificationRead();
                            navigate(`/notification/${item.id}`, {
                              state: { notification: item },
                            });
                          }}
                          className={
                            item.is_read == true
                              ? 'w-56 whitespace-break-spaces bg-accent'
                              : 'w-56 whitespace-break-spaces'
                          }
                        >
                          <p>{truncate(item.name, 100, 52)}</p>
                        </DropdownMenuItem>
                      ))
                  : notification
                      ?.sort((a, b) => b.id - a.id)
                      .filter((item) => item.type === 2)
                      .map((item) => (
                        <DropdownMenuItem
                          key={item.id}
                          onClick={() => {
                            setNotifId(item.id);
                            setRead(item.is_read);
                            notificationRead();
                            navigate(`notification/${item.id}`, {
                              state: { notification: item },
                            });
                          }}
                          className={
                            item.is_read == true
                              ? 'w-56 whitespace-break-spaces bg-accent'
                              : 'w-56 whitespace-break-spaces'
                          }
                        >
                          <p>{truncate(item.name, 100, 52)}</p>
                        </DropdownMenuItem>
                      ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={toggle}
          >
            {mode === 'dark' ? (
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            )}

            <span className="sr-only">Toggle theme</span>
          </Button>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-center space-x-2 rounded-md p-2 hover:bg-accent transition-all">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={
                            userPhoto === undefined
                              ? 'https://github.com/shadcn.png'
                              : userPhoto?.data.image
                          }
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <h2 className="font-normal text-xs">{userData.name}</h2>
                    </div>
                    {/* </Button> */}
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56 ">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onClick={() => navigate('/settings/profile')}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {userDataParse?.role === 0 ? (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => navigate('user')}>
                            <Users className="mr-2 h-4 w-4" />
                            <span>Team</span>
                          </DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <UserPlus className="mr-2 h-4 w-4" />
                              <span>Invite users</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem
                                  onClick={() => navigate('unprocess-users')}
                                >
                                  <Mail className="mr-2 h-4 w-4" />
                                  <span>Email</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <PlusCircle className="mr-2 h-4 w-4" />
                                  <span>More...</span>
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                      </>
                    ) : (
                      <></>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className=" cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem('amount-data');
                        localStorage.removeItem('invoice-data');
                        localStorage.removeItem('user-data');
                        localStorage.removeItem('user');
                        window.location.reload();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent className="font-sans">
                {userData.name}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Header;
