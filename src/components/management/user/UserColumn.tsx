import { ColumnDef } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { ArrowUpDownIcon } from 'lucide-react';

import UserDropdown from './UserDropdown';

export type UserDataType = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const columns: ColumnDef<UserDataType>[] = [
  {
    id: 'No',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          No
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (props) => {
      return (
        props?.table?.getSortedRowModel()?.flatRows?.indexOf(props?.row) + 1
      );
    },
    enableHiding: false,
  },

  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: 'email',
    header: 'Email',
  },

  {
    accessorKey: 'action',
    enableHiding: false,
    cell: ({ row }) => {
      const users = row.original;

      return <UserDropdown id={users.id} />;
    },
  },
];

export const userColumnMobile: ColumnDef<UserDataType>[] = [
  {
    id: 'No',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          No
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (props) => {
      return (
        props?.table?.getSortedRowModel()?.flatRows?.indexOf(props?.row) + 1
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
