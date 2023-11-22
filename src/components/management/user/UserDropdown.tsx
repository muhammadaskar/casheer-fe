/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ToastAction } from '@/components/ui/toast';
import { toast } from '@/components/ui/use-toast';
import { useUserRoleMutation } from '@/hooks/use-user';
import { MoreHorizontal } from 'lucide-react';

type IProps = {
  id: number;
};

function UserDropdown({ id }: IProps) {
  const useRoleMutation = useUserRoleMutation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            useRoleMutation.mutate(id, {
              onSuccess: () => {
                toast({
                  variant: 'default',
                  description: 'Update role berhasil',
                });
              },

              onError: (error: any) => {
                const message = JSON.parse(error?.response?.request.response);

                toast({
                  variant: 'destructive',
                  description: message?.data.errors,
                  action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                  ),
                });
              },
            })
          }
        >
          Ubah ke Admin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
