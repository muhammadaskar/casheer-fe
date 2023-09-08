import { ColumnDef } from '@tanstack/react-table';
import { ProductData } from '../product/Column';
import { Button } from '@/components/ui/button';
import { ArrowUpDownIcon, MoreHorizontal, PenSquareIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';

import UpdateQuantitySheet from './UpdateQuantitySheet';

export const columns: ColumnDef<ProductData>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          className="text-xs sm:text-sm"
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
          className="text-xs sm:text-sm"
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs sm:text-sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Qty
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: 'action',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

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

            <Sheet>
              <SheetTrigger asChild>
                <div className="relative flex cursor-default hover:bg-accent select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 space-x-2">
                  <PenSquareIcon className="w-4 h-4" />
                  <span>Update Quantity</span>
                </div>
              </SheetTrigger>

              <UpdateQuantitySheet
                id={product.id}
                quantity={product.quantity}
              />
            </Sheet>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const stockColumnMobile: ColumnDef<ProductData>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs sm:text-sm"
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs sm:text-sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Qty
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: 'action',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

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

            <Sheet>
              <SheetTrigger asChild>
                <div className="relative flex cursor-default hover:bg-accent select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 space-x-2">
                  <PenSquareIcon className="w-4 h-4" />
                  <span>Update Quantity</span>
                </div>
              </SheetTrigger>

              <UpdateQuantitySheet
                id={product.id}
                quantity={product.quantity}
              />
            </Sheet>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
