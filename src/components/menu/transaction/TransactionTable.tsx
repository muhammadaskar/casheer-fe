import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import PayForm from './PayForm';

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV008',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV009',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV010',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV011',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV012',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV013',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];

const TransactionTable = () => {
  // const { state, dispatch } = useContext(MyContext);

  return (
    <Card className="w-full h-[34rem]">
      <Sheet>
        <CardContent className="space-y-2 h-[88%] overflow-scroll">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="lg:w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
                {/* <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody className="w-full h-fit">
              {/* <TableRow>
                <TableCell className="font-medium">
                  {state.orderType.id}
                </TableCell>
                <TableCell>{state.orderType.product_name}</TableCell>
                <TableCell>{state.orderType.price}</TableCell>
                <TableCell>{state.orderType.total}</TableCell>
              </TableRow> */}
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableRow className="border-t">
              <TableHead className="lg:w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
            {/* <TableHeader className="w-full">
              <TableRow>
                <TableHead className="lg:w-[100px]">QTY</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Total</TableHead> */}
            {/* <TableHead className="text-right">Amount</TableHead> */}
            {/* </TableRow>
            </TableHeader> */}
          </Table>

          <SheetContent side={'bottom'} className="space-y-3">
            <SheetHeader>
              <SheetTitle>Pembayaran</SheetTitle>
              <SheetDescription>
                Lakukan pembayaran untuk menyelesaikan transaksi.
              </SheetDescription>
            </SheetHeader>
            <PayForm />
            <SheetFooter>
              <SheetClose asChild>
                <Button
                  type="button"
                  onClick={() => {
                    // dispatch({
                    //   type: Types.Order,
                    //   payload: {
                    //     product_name: '',
                    //     id: '',
                    //     category: '',
                    //     price: '',
                    //     qty: 0,
                    //     total: '',
                    //   },
                    // });
                    console.log('Tes');
                  }}
                >
                  Save changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </CardContent>
        <CardFooter>
          <SheetTrigger className="w-full">
            <Button className="w-full">Pembayaran</Button>
          </SheetTrigger>
        </CardFooter>
      </Sheet>
    </Card>
  );
};

export default TransactionTable;
