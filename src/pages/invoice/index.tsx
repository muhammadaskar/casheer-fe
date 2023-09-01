import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { rupiahFormat } from '@/lib/utils';

import { useLocation } from 'react-router-dom';

type InvoiceListType = {
  ID: number;
  MemberCode: string;
  TransactionCode: string;
  Transactions: string;
  TotalQuantity: number;
  Amount: number;
  UserID: number;
  CreatedAt: string;
  UpdatedAt: string;
};

type ItemListType = {
  product_id: string;
  product_name: string;
  quantity: string;
};

const InvoicePage = () => {
  const { data } = useLocation().state;
  const invoiceList: InvoiceListType = data;
  const itemList: [ItemListType] = JSON.parse(invoiceList.Transactions);

  console.log(invoiceList);

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Nama Barang</TableHead>
          <TableHead>Jumlah</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {itemList?.map((item) => (
          <TableRow key={item.product_id}>
            <TableCell className="font-medium">{item.product_id}</TableCell>
            <TableCell>{item.product_name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell className="text-right">
              {rupiahFormat(invoiceList.Amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InvoicePage;
