import { columnMobile, columns } from '@/components/management/product/Column';
import { DataTable } from '@/components/management/product/DataTable';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProductQuery } from '@/hooks/use-product';
import { useState } from 'react';
import Customer from '../customer';
import Stock from '../stock';
import User from '../user';
import { DataTableMobile } from '@/components/management/product/DataTableMobile';

const Product = () => {
  const [value, setValue] = useState('product');
  const { data } = useProductQuery();

  return (
    <main className="px-2 md:px-5 mx-auto py-2 md:py-5 space-y-3">
      <h1 className="hidden md:block font-semibold tracking-tight text-2xl">
        Product
      </h1>
      <h1 className="font-semibold tracking-tight text-2xl block md:hidden">
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </h1>
      <p className="text-sm text-muted-foreground">Lorem ipsum dolor amet.</p>
      <Separator className="my-4 hidden md:block" />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data?.data} />
      </div>

      <Tabs className="block md:hidden space-y-3" defaultValue="product">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="product" onClick={() => setValue('product')}>
            Product
          </TabsTrigger>
          <TabsTrigger value="stock" onClick={() => setValue('stock')}>
            Stock
          </TabsTrigger>
          <TabsTrigger value="customer" onClick={() => setValue('customer')}>
            Customer
          </TabsTrigger>
          <TabsTrigger value="user" onClick={() => setValue('user')}>
            User
          </TabsTrigger>
        </TabsList>
        <TabsContent value="product">
          {/* <DataTable columns={columns} data={data?.data} /> */}
          <DataTableMobile columns={columnMobile} data={data?.data} />
        </TabsContent>
        <TabsContent value="stock">
          <Stock />
        </TabsContent>
        <TabsContent value="customer">
          <Customer />
        </TabsContent>
        <TabsContent value="user">
          <User />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Product;
