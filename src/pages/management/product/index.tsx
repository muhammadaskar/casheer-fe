/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { columnMobile, columns } from '@/components/management/product/Column';
import { DataTable } from '@/components/management/product/DataTable';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  fetchProduct,
  useProductQuery,
  useSearchProduct,
} from '@/hooks/use-product';
import { ChangeEvent, useEffect, useState } from 'react';
import Customer from '../customer';
import Stock from '../stock';
import User from '../user';
import { useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

const Product = () => {
  const [value, setValue] = useState('product');
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { status, data, isPreviousData } = useProductQuery(page);
  const [query, setQuery] = useState('');
  const { fetchSearch, searchData } = useSearchProduct();

  useEffect(() => {
    fetchSearch(query);
  }, [query]);

  useEffect(() => {
    if (!isPreviousData && !data?.data.is_last_page) {
      queryClient.prefetchQuery({
        queryKey: ['product', page + 1],
        queryFn: () => fetchProduct(page + 1),
      });
    }
  }, [data, isPreviousData, page, queryClient]);

  return (
    <>
      <Helmet>
        <title>Produk</title>
      </Helmet>
      <main className="px-2 sm:px-5 mx-auto sm:py-5 space-y-3">
        <h1 className="hidden sm:block font-semibold tracking-tight text-2xl">
          Product
        </h1>
        <h1 className="font-semibold tracking-tight text-2xl block sm:hidden">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </h1>
        <p className="text-sm text-muted-foreground">Lorem ipsum dolor amet.</p>
        <Separator className="my-4 hidden md:block" />

        <div className="hidden md:block">
          {query ? (
            <DataTable
              columns={columns}
              status={status}
              data={searchData?.data.products}
              onNext={() => setPage((old) => (data?.data ? old + 1 : old))}
              disableNext={isPreviousData || data?.data.is_last_page}
              onPrev={() => setPage((old) => Math.max(old - 1, 0))}
              disablePrev={page === 1}
              onSearch={(event: ChangeEvent<HTMLInputElement>) =>
                setQuery(event.target.value)
              }
            />
          ) : (
            <DataTable
              columns={columns}
              status={status}
              data={data?.data.products}
              onNext={() => setPage((old) => (data?.data ? old + 1 : old))}
              disableNext={isPreviousData || data?.data.is_last_page}
              onPrev={() => setPage((old) => Math.max(old - 1, 0))}
              disablePrev={page === 1}
              onSearch={(event: ChangeEvent<HTMLInputElement>) =>
                setQuery(event.target.value)
              }
            />
          )}
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
            {query ? (
              <DataTable
                columns={columnMobile}
                status={status}
                data={searchData?.data.products}
                onNext={() => setPage((old) => (data?.data ? old + 1 : old))}
                disableNext={isPreviousData || data?.data.is_last_page}
                onPrev={() => setPage((old) => Math.max(old - 1, 0))}
                disablePrev={page === 1}
                onSearch={(event: ChangeEvent<HTMLInputElement>) =>
                  setQuery(event.target.value)
                }
              />
            ) : (
              <DataTable
                columns={columnMobile}
                status={status}
                data={data?.data.products}
                onNext={() => setPage((old) => (data?.data ? old + 1 : old))}
                disableNext={isPreviousData || data?.data.is_last_page}
                onPrev={() => setPage((old) => Math.max(old - 1, 0))}
                disablePrev={page === 1}
                onSearch={(event: ChangeEvent<HTMLInputElement>) =>
                  setQuery(event.target.value)
                }
              />
            )}
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
    </>
  );
};

export default Product;
