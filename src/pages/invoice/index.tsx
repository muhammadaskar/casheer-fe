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
import { Helmet } from 'react-helmet';

import { useLocation, useNavigate } from 'react-router-dom';

type InvoiceListType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

type AmountType = {
  Amount: number;
  UpdatedAt: string;
  CreatedAt: string;
};

const InvoicePage = () => {
  const { data, amount } = useLocation().state;
  const invoiceList: [InvoiceListType] = data;
  const amountPrice: AmountType = amount;
  const { data: storeInfo } = useCasheerInfoQuery();
  const navigate = useNavigate();

  const dateInvoice = new Date(amountPrice.CreatedAt);

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
        <p className="font-medium text-sm">{dateInvoice.toString()}</p>
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
          {invoiceList?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
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
            {rupiahFormat(amountPrice?.Amount)}
          </TableCell>
        </TableFooter>
      </Table>
    </>
  );
};

export default InvoicePage;
