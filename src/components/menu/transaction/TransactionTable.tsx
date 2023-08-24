/* eslint-disable react-hooks/exhaustive-deps */
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { useContext, useEffect, useState } from 'react';
import { MyContext } from '@/context';
import { OrderContextType } from '@/types/context-type';

const TransactionTable = () => {
  const { state } = useContext(MyContext);
  const [invoice, setInvoice] = useState<Array<OrderContextType>>([]);

  useEffect(() => {
    setInvoice([...invoice, state.orderType]);
  }, [state.orderType]);

  console.log(invoice);

  return (
    <Card className="w-full h-[29.5rem]">
      <Sheet>
        <ScrollArea className="space-y-2 h-[86%] overflow-hidden">
          <CardContent>
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full h-fit">
                {invoice
                  .filter((item) => item.id !== 0)
                  .map((invoices) => (
                    <TableRow key={invoices.id}>
                      <TableCell>{invoices.product_name}</TableCell>
                      <TableCell>{invoices.qty}</TableCell>
                      <TableCell>{invoices.price}</TableCell>
                      <TableCell>{invoices.total}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
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
                    onClick={() => {
                      setInvoice([]);
                    }}
                  >
                    Save changes
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </CardContent>
        </ScrollArea>
        <CardFooter>
          <SheetTrigger asChild className="w-full">
            <Button className="w-full">Pembayaran</Button>
          </SheetTrigger>
        </CardFooter>
      </Sheet>
    </Card>
  );
};

export default TransactionTable;
