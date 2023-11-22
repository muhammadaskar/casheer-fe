import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export type Customer = {
  ID: number;
  MemberCode: string;
  Name: string;
  IsActive: number;
  Phone: string;
};

export const columns: ColumnDef<Customer>[] = [
  {
    // accessorKey: 'ID',
    id: 'No',
    header: ({ column }) => {
      return (
        <Button
          variant={'ghost'}
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          No
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (props) => {
      return (
        props?.table?.getSortedRowModel()?.flatRows?.indexOf(props?.row) + 1
      );
    },
  },
  {
    accessorKey: 'MemberCode',
    header: 'Customer Code',
  },
  {
    accessorKey: 'Name',
    header: 'Name',
  },
  {
    accessorKey: 'Phone',
    header: 'Phone',
  },
  {
    accessorKey: 'action',
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;

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

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(customer.MemberCode)}
            >
              Copy Customer Code
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const columnMobile: ColumnDef<Customer>[] = [
  // {
  //   accessorKey: 'ID',
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant={'ghost'}
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         No
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: 'Name',
    header: 'Name',
  },
  {
    accessorKey: 'Phone',
    header: 'Phone',
    enableHiding: true,
  },
  {
    accessorKey: 'action',
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;

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

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(customer.MemberCode)}
            >
              Copy Customer Code
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
