import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { ArrowUpDownIcon } from 'lucide-react';

export type UserDataType = {
  id: number;
  name: string;
  username: string;
  email: string;
  //   created_at: '2023-07-19T00:53:50.405Z';
  //   updated_at: '2023-07-19T00:53:50.405Z';
};

export const columns: ColumnDef<UserDataType>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className="text-xs sm:text-base"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          No
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableHiding: false,
  },

  {
    accessorKey: 'name',
    header: 'Name',
  },

  {
    accessorKey: 'username',
    header: 'Username',
  },

  {
    accessorKey: 'email',
    header: 'Email',
  },
];

export const userColumnMobile: ColumnDef<UserDataType>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className="text-xs sm:text-base"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          No
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableHiding: false,
  },

  {
    accessorKey: 'name',
    header: 'Name',
  },

  {
    accessorKey: 'username',
    header: 'Username',
  },
];
