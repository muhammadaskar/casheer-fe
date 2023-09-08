import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
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

import DeleteProduct from './DeleteProduct';

export type ProductData = {
  id: number;
  category_id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
};

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

              <UpdateSheet
                id={product.id}
                category={product.category}
                category_id={product.category_id}
                name={product.name}
                price={product.price}
                qty={product.quantity}
                desc={product.description}
              />
            </Sheet>

            <DeleteProduct id={product.id}>
              <div className="relative flex text-red-500 cursor-default hover:bg-accent select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 space-x-2">
                <Trash2Icon className="w-4 h-4" />
                <span>Delete Produk</span>
              </div>
            </DeleteProduct>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const columnMobile: ColumnDef<ProductData>[] = [
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs sm:text-base"
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

              <UpdateSheet
                id={product.id}
                category={product.category}
                category_id={product.category_id}
                name={product.name}
                price={product.price}
                qty={product.quantity}
                desc={product.description}
              />
            </Sheet>

            <DeleteProduct id={product.id}>
              <div className="relative flex text-red-500 cursor-default hover:bg-accent select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 space-x-2">
                <Trash2Icon className="w-4 h-4" />
                <span>Delete Produk</span>
              </div>
            </DeleteProduct>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
