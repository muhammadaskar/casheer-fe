import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { ColumnDef } from '@tanstack/react-table';
import {
  ArrowUpDownIcon,
  MoreHorizontal,
  PenSquareIcon,
  Trash2Icon,
} from 'lucide-react';
import UpdateSheet from './UpdateSheet';

export type ProductData = {
  id: number;
  name: string;
  category: string;
  price: number;
};

export const columns: ColumnDef<ProductData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
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
    accessorKey: 'category',
    header: 'Category',
  },

  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'action',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      console.log(product);

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
                  <span>Update Produk</span>
                </div>
              </SheetTrigger>

              <UpdateSheet />
            </Sheet>

            <DropdownMenuItem className="space-x-2 text-red-500">
              <Trash2Icon className="w-4 h-4" />
              <span>Delete Produk</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const columnMobile: ColumnDef<ProductData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
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
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'action',
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      console.log(product);

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
                  <span>Update Produk</span>
                </div>
              </SheetTrigger>

              <UpdateSheet />
            </Sheet>

            <DropdownMenuItem className="space-x-2 text-red-500">
              <Trash2Icon className="w-4 h-4" />
              <span>Delete Produk</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
