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

import { useLocation } from 'react-router-dom';

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
};

const InvoicePage = () => {
  const { data, amount } = useLocation().state;
  const invoiceList: [InvoiceListType] = data;
  const amountPrice: AmountType = amount;
  const { data: storeInfo } = useCasheerInfoQuery();

  // console.log(amount);

  return (
    <>
      <Helmet>
        <title>Invoice</title>
      </Helmet>

      {/* <div>{status !== 'loading' ? <h1>{storeInfo?.data.Name}</h1> : ''}</div> */}
      <div className="px-2">
        <h1 className="text-xl font-semibold">{storeInfo?.data.Name}</h1>
        {/* <p className="">{Date(amountPrice?.UpdatedAt)}</p> */}
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
