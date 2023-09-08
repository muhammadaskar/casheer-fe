/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BellIcon,
  Cloud,
  Github,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Moon,
  Plus,
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
import { UserType } from '@/types/user-type';
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

type HeaderProps = {
  mode: string | null;
  toggle: () => void;
};

const Header: FC<HeaderProps> = ({ mode, toggle }) => {
  const navigate = useNavigate();
  const { data } = useNotificationQuery();
  const { data: storeInfo, status } = useCasheerInfoQuery();
  const [notifId, setNotifId] = useState(0);
  const [read, setRead] = useState(true);

  const notificationMutation = useNotificationMutation(notifId);
  const notification: NotificationType[] = data?.data;
  const user: UserType = JSON.parse(localStorage.getItem('user') || '');

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
      <div className="border-b border-t flex justify-between items-center px-5 py-1 top-0">
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

        <div className="flex space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Button
                  variant="outline"
                  className="relative h-8 w-8"
                  size="icon"
                >
                  <BellIcon className="h-[1.2rem] w-[1.2rem]" />

                  {notification?.filter((item) => item.is_read == true)
                    .length ? (
                    <Badge className=" absolute z-20 bg-red-500 h-5 w-1 text-xs top-[-0.25rem] text-white items-center justify-center left-5 hover:bg-red-500/80">
                      {
                        notification?.filter((item) => item.is_read == true)
                          .length
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
                {notification
                  ?.sort((a, b) => b.id - a.id)
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
                    {/* <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                > */}
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {/* </Button> */}
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56 ">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onClick={() => navigate('settings/profile')}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
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
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              <span>Email</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              <span>Message</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <PlusCircle className="mr-2 h-4 w-4" />
                              <span>More...</span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>New Team</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Github className="mr-2 h-4 w-4" />
                      <span>GitHub</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LifeBuoy className="mr-2 h-4 w-4" />
                      <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <Cloud className="mr-2 h-4 w-4" />
                      <span>API</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className=" cursor-pointer"
                      onClick={() => {
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
              <TooltipContent className="font-sans">{user.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Header;
