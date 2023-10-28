/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { shallow } from 'zustand/shallow';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { useTransactionMutation } from '@/hooks/use-transaction';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Invoice } from '@/types/product-type';
import { numericValue, rupiahFormat } from '@/lib/utils';
import { XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type PayInput = {
  member_code: string;
  price_total: number;
  product_id: number;
  discount: number;
  total_pay: number;
};

const TransactionTable = () => {
  const transactionMutation = useTransactionMutation();
  const [disable, setDisable] = useState(true);
  const [invoice, setInvoice] = useState<any>([]);
  const navigate = useNavigate();
  const [input, setInput] = useReducer(
    (current: PayInput, update: Partial<PayInput>) => ({
      ...current,
      ...update,
    }),
    {
      member_code: '',
      product_id: 0,
      price_total: 0,
      discount: 0,
      total_pay: 0,
    }
  );
  const { invoiceForm, setInvoiceForm } = useInvoiceStore(
    (state) => ({
      invoiceForm: state.invoiceForm,
      setInvoiceForm: state.setInvoiceForm,
    }),
    shallow
  );
  const total = invoiceForm.reduce(
    (acc: any, current: any) => acc + current.total,
    0
  );

  useEffect(() => {
    if (transactionMutation.isSuccess) {
      toast({
        variant: 'default',
        description: 'Transaksi berhasil',
        action: (
          <ToastAction
            altText="Check Invoice"
            onClick={() =>
              navigate('/invoice', {
                state: {
                  data: invoice,
                  amount: transactionMutation?.data?.data,
                },
              })
            }
          >
            Cek Invoice
          </ToastAction>
        ),
      });
    }
  }, [
    transactionMutation.isSuccess,
    navigate,
    transactionMutation.data?.data,
    invoice,
  ]);

  function submitTransaction() {
    transactionMutation.mutate(
      {
        member_code: input.member_code,
        transactions: `{${invoiceForm?.map(({ id, quantity }: any) => [
          `{${id}`,
          `${quantity}}`,
        ])}}`,
      },
      {
        onError: (error: any) => {
          const message = JSON.parse(error?.response?.request.response);

          toast({
            variant: 'destructive',
            description: message?.data.errors,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        },
      }
    );
    setInvoice(invoiceForm);
    setInvoiceForm([]);
    setInput({
      member_code: '',
      discount: 0,
      total_pay: 0,
    });
  }

  function deleteInvoiceItem(id: number) {
    const updatedItems = invoiceForm.filter((item: Invoice) => item.id !== id);
    return setInvoiceForm(updatedItems);
  }

  useEffect(() => {
    if (input.total_pay !== 0) {
      return setDisable(false);
    }
    return setDisable(true);
  }, [input.total_pay]);

  return (
    <Card className="w-full h-[29.5rem]">
      <Sheet>
        <ScrollArea className="space-y-2 h-[86%] overflow-hidden">
          <CardContent>
            {/* Desktop */}
            <Table className="hidden sm:block w-full">
              <TableHeader className="text-xs sm:text-sm">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full h-fit text-xs sm:text-sm">
                {invoiceForm.map((invoices: Invoice) => (
                  <TableRow key={invoices.id}>
                    <TableCell>{invoices.product_name}</TableCell>
                    <TableCell>{invoices.quantity}</TableCell>
                    <TableCell>{rupiahFormat(invoices.price)}</TableCell>
                    <TableCell>{rupiahFormat(invoices.total)}</TableCell>
                    <TableCell>
                      <Button
                        variant={'ghost'}
                        onClick={() => deleteInvoiceItem(invoices.id)}
                      >
                        <XIcon className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Mobile */}
            <Table className="block sm:hidden w-full">
              <TableHeader className="text-xs sm:text-sm">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Qty</TableHead>
                  {/* <TableHead className="hidden sm:flex sm:items-center">
                    Price
                  </TableHead> */}
                  <TableHead>Total</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full h-fit text-xs sm:text-sm">
                {invoiceForm.map((invoices: Invoice) => (
                  <TableRow key={invoices.id}>
                    <TableCell>{invoices.product_name}</TableCell>
                    <TableCell>{invoices.quantity}</TableCell>
                    {/* <TableCell className="hidden sm:grid sm:items-center">
                      {rupiahFormat(invoices.price)}
                    </TableCell> */}
                    <TableCell>{rupiahFormat(invoices.total)}</TableCell>
                    <TableCell>
                      <Button
                        variant={'ghost'}
                        onClick={() => deleteInvoiceItem(invoices.id)}
                      >
                        <XIcon className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
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
              <div className="flex flex-col space-y-2">
                <Label htmlFor="totals">Total Harga</Label>
                <Input
                  type="text"
                  value={rupiahFormat(
                    input.discount !== 0 ? total - input.discount : total
                  )}
                  readOnly
                  placeholder="Rp.500.000,00"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="member-code">Kode Member</Label>
                <Input
                  type="text"
                  placeholder="2342348234234 (Optional)"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInput({
                      member_code: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="disc">Potongan</Label>
                <Input
                  type="text"
                  placeholder="Rp.100.000,00 (Optional)"
                  value={rupiahFormat(input.discount)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInput({
                      discount: Number(numericValue(e.target.value)),
                    })
                  }
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="payTotals">Total Bayar *</Label>
                <Input
                  type="text"
                  placeholder="Rp.550.000,00"
                  value={rupiahFormat(input.total_pay)}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setInput({
                      total_pay: Number(numericValue(e.target.value)),
                    })
                  }
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="payback">Kembalian</Label>
                <Input
                  type="text"
                  placeholder="Rp.50.000,00"
                  value={rupiahFormat(
                    input.total_pay === 0
                      ? 0
                      : input.total_pay - (total - input.discount)
                  )}
                  readOnly
                />
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button disabled={disable} onClick={submitTransaction}>
                    Save changes
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
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
