/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCasheerInfoQuery } from '@/hooks/use-casheer';
import { rupiahFormat } from '@/lib/utils';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { useNavigate } from 'react-router-dom';

type InvoiceListType = {
  id: number;
  product_name: string;
  price: number;
  quantity: number;
  total: number;
};

type AmountType = {
  Amount: number;
  amount: number;
  UpdatedAt: string;
  CreatedAt: string;
  created_at: string;
};

const InvoicePage = () => {
  const invoiceList: [InvoiceListType] = JSON.parse(
    localStorage.getItem('invoice-data') || ''
  );
  const amountPrice: AmountType = JSON.parse(
    localStorage.getItem('amount-data') || ''
  );
  const { data: storeInfo } = useCasheerInfoQuery();
  const navigate = useNavigate();

  const dateInvoice = new Date(amountPrice.CreatedAt || amountPrice.created_at);

  useEffect(() => {
    window.print();
  }, []);

  return (
    <>
      <Helmet>
        <title>Invoice</title>
      </Helmet>

      {/* <div>{status !== 'loading' ? <h1>{storeInfo?.data.Name}</h1> : ''}</div> */}
      <div
        className="flex items-center space-x-2 hover:cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img
          className="h-6 w-auto"
          src={storeInfo?.data.Image}
          alt="Casheer APP"
        />
        <h1 className="font-semibold text-lg tracking-tighter ">
          {storeInfo?.data.Name}
        </h1>
      </div>

      <div className="py-5 flex flex-col items-end">
        <p className="font-medium text-sm">{dateInvoice.toDateString()}</p>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Nama Barang</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoiceList?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.product_name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{rupiahFormat(item.price)}</TableCell>
              <TableCell className="text-right">
                {rupiahFormat(item.total)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableCell>Amount</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell className="text-right">
            {rupiahFormat(amountPrice?.Amount || amountPrice?.amount)}
          </TableCell>
        </TableFooter>
      </Table>
    </>
  );
};

export default InvoicePage;
