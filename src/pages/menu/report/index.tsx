/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  columns,
  reportColumnMobile,
} from '@/components/menu/report/ReportColumn';
import ReportTable from '@/components/menu/report/ReportTable';
import SkeletonTable from '@/components/skeleton-loader/SkeletonTable';
import { Separator } from '@/components/ui/separator';
import { useTransactionQuery } from '@/hooks/use-transaction';
import { TransactionType } from '@/types/product-type';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const Report = () => {
  const { data, status } = useTransactionQuery();
  const [transaction, setTransaction] = useState([]);

  const parseToJSON = (str: string) => {
    try {
      return JSON.parse(str);
    } catch (error) {
      console.error('Error parsing product_and_quantity:', error);
      return [];
    }
  };

  useEffect(() => {
    if (status !== 'loading') {
      const newData = data?.data?.map((item: TransactionType) => {
        const parsedProducts = parseToJSON(item.product_and_quantity);
        return {
          ...item,
          product_and_quantity: parsedProducts,
        };
      });

      setTransaction(newData);
    } else {
      setTransaction([]);
    }
  }, [data, status]);

  return (
    <>
      <Helmet>
        <title>Laporan</title>
      </Helmet>

      <main className="px-2 md:px-5 py-2 md:py-5 space-y-3 md:space-y-5">
        <div className="hidden md:block">
          <h1 className="font-semibold tracking-tight text-2xl">
            Pelaporan & Analisis
          </h1>
          <p className="text-sm text-muted-foreground">
            This is your transaction page 🤑
          </p>
        </div>
        <Separator className="my-4 hidden md:block" />
        <div className="hidden sm:block space-y-3">
          {status !== 'loading' ? (
            <ReportTable data={transaction} columns={columns} />
          ) : (
            <SkeletonTable />
          )}
        </div>

        <div className="block space-y-3 sm:hidden">
          {status !== 'loading' ? (
            <ReportTable data={transaction} columns={reportColumnMobile} />
          ) : (
            <SkeletonTable />
          )}
        </div>
      </main>
    </>
  );
};

export default Report;
