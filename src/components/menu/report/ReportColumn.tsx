import { ColumnDef } from '@tanstack/react-table';
// import { ProductData } from '../product/Column';
import { Button } from '@/components/ui/button';
import { ArrowUpDownIcon, MoreHorizontal } from 'lucide-react';
import { TransactionParseType } from '@/types/product-type';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

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
  {
    accessorKey: 'action',
    enableHiding: false,
    cell: ({ row }) => {
      const invoice = row.original;

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
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(invoice.transaction_code)
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                to={'/invoice'}
                state={{
                  data: invoice.product_and_quantity,
                  amount: invoice,
                }}
              >
                View payment details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
