import { ColumnDef } from '@tanstack/react-table';
// import { ProductData } from '../product/Column';
import { Button } from '@/components/ui/button';
import { ArrowUpDownIcon } from 'lucide-react';
import { TransactionParseType } from '@/types/product-type';

export const columns: ColumnDef<TransactionParseType>[] = [
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
    accessorKey: 'member_code',
    header: 'Member',
  },

  {
    accessorKey: 'casheer_name',
    header: 'Kasir',
  },

  {
    accessorKey: 'transaction_code',
    header: 'Kode Transaksi',
  },
];

export const reportColumnMobile: ColumnDef<TransactionParseType>[] = [
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
    accessorKey: 'transaction_code',
    header: 'Kode Transaksi',
  },

  {
    accessorKey: 'casheer_name',
    header: 'Kasir',
  },
];
