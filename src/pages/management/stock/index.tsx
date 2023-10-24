/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  columns,
  stockColumnMobile,
} from '@/components/management/stock/StockColumn';
import { StockTable } from '@/components/management/stock/StockTable';
import { Separator } from '@/components/ui/separator';
import {
  fetchProduct,
  useProductQuery,
  useSearchProduct,
} from '@/hooks/use-product';
import { useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const Stock = () => {
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
        <title>Stok</title>
      </Helmet>
      <main className="px-2 md:px-5 mx-auto md:py-5 space-y-3">
        <h1 className="hidden md:block font-semibold tracking-tight text-2xl">
          Stock
        </h1>
        <p className="hidden text-sm md:block text-muted-foreground">
          Lorem ipsum dolor amet.
        </p>
        <Separator className="my-4 hidden md:block" />
        <div className="hidden sm:block">
          {query ? (
            <StockTable
              columns={columns}
              data={searchData?.data.products.filter(
                (item: any) => item.is_deleted === 1
              )}
              status={status}
              onNext={() => setPage((old) => (data?.data ? old + 1 : old))}
              disableNext={isPreviousData || data?.data.is_last_page}
              onPrev={() => setPage((old) => Math.max(old - 1, 0))}
              disablePrev={page === 1}
              onSearch={(e: ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
            />
          ) : (
            <StockTable
              columns={columns}
              data={data?.data.products.filter(
                (item: any) => item.is_deleted === 1
              )}
              status={status}
              onNext={() => setPage((old) => (data?.data ? old + 1 : old))}
              disableNext={isPreviousData || data?.data.is_last_page}
              onPrev={() => setPage((old) => Math.max(old - 1, 0))}
              disablePrev={page === 1}
              onSearch={(e: ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
            />
          )}
        </div>

        <div className="block sm:hidden">
          {query ? (
            <StockTable
              columns={stockColumnMobile}
              data={searchData?.data.products}
              status={status}
              onNext={() => setPage((old) => (data?.data ? old + 1 : old))}
              disableNext={isPreviousData || data?.data.is_last_page}
              onPrev={() => setPage((old) => Math.max(old - 1, 0))}
              disablePrev={page === 1}
              onSearch={(e: ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
            />
          ) : (
            <StockTable
              columns={stockColumnMobile}
              data={data?.data.products}
              status={status}
              onNext={() => setPage((old) => (data?.data ? old + 1 : old))}
              disableNext={isPreviousData || data?.data.is_last_page}
              onPrev={() => setPage((old) => Math.max(old - 1, 0))}
              disablePrev={page === 1}
              onSearch={(e: ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Stock;
