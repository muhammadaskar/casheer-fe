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

  {
    accessorKey: 'email',
    header: 'Email',
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
