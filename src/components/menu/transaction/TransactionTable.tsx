/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { Sheet, SheetTrigger } from '@/components/ui/sheet';
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
import { shallow } from 'zustand/shallow';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { useTransactionMutation } from '@/hooks/use-transaction';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

const TransactionTable = () => {
  const transactionMutation = useTransactionMutation();

  const { invoiceForm, setInvoiceForm } = useInvoiceStore(
    (state) => ({
      invoiceForm: state.invoiceForm,
      setInvoiceForm: state.setInvoiceForm,
    }),
    shallow
  );

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
                {invoiceForm.map((invoices) => (
                  <TableRow key={invoices.id}>
                    <TableCell>{invoices.name}</TableCell>
                    <TableCell>{invoices.quantity}</TableCell>
                    <TableCell>{invoices.price}</TableCell>
                    <TableCell>{invoices.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <PayForm
              total={invoiceForm.reduce(
                (acc, current) => acc + current.total,
                0
              )}
              onClick={() => {
                transactionMutation.mutate(
                  {
                    member_code: '',
                    transactions: `{${invoiceForm.map(({ id, quantity }) => [
                      `{${id}`,
                      `${quantity}}`,
                    ])}}`,
                  },
                  {
                    onSuccess: () => {
                      toast({
                        variant: 'default',
                        description: 'Transaksi berhasil',
                      });
                    },
                    onError: () => {
                      toast({
                        variant: 'destructive',
                        description: 'Transaksi gagal',
                        action: (
                          <ToastAction altText="Try again">
                            Try again
                          </ToastAction>
                        ),
                      });
                    },
                  }
                );
                setInvoiceForm([
                  {
                    id: 0,
                    name: '',
                    price: 0,
                    quantity: 0,
                    total: 0,
                  },
                ]);
              }}
            />
          </CardContent>
        </ScrollArea>
        <CardFooter>
          <SheetTrigger asChild className="w-full">
            <Button
              className="w-full"
              disabled={invoiceForm.length >= 1 ? false : true}
            >
              Pembayaran
            </Button>
          </SheetTrigger>
        </CardFooter>
      </Sheet>
    </Card>
  );
};

export default TransactionTable;
