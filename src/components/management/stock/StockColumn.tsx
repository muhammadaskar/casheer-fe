import { ColumnDef } from '@tanstack/react-table';
import { ProductData } from '../product/Column';
import { Button } from '@/components/ui/button';
import { ArrowUpDownIcon } from 'lucide-react';

export const columns: ColumnDef<ProductData>[] = [
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
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nama
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
];
