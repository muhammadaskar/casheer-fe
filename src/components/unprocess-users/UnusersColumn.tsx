import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDownIcon } from 'lucide-react';
import { Button } from '../ui/button';
import UnusersAction from './UnusersAction';

export type UnprocessUserData = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const unprocessUserColumns: ColumnDef<UnprocessUserData>[] = [
  {
    accessorKey: 'id',
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
    enableHiding: false,
  },

  {
    accessorKey: 'username',
    header: 'Username',
  },

  {
    accessorKey: 'email',
    header: 'Email',
  },

  {
    accessorKey: 'action',
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return <UnusersAction id={user.id} />;
    },
  },
];
