import { ColumnDef } from '@tanstack/react-table';

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
    header: 'Name',
  },

  {
    accessorKey: 'category',
    header: 'Category',
  },

  {
    accessorKey: 'price',
    header: 'Price',
  },
];
