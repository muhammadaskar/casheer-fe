import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ChangeEvent, FC, useReducer } from 'react';

type Props = {
  total: number;
  onClick: () => void;
};

type PayInput = {
  member_code: string;
  product_id: number;
  qty: number;
  discount: number;
  total_pay: number;
};

const PayForm: FC<Props> = ({ total, onClick }) => {
  const [input, setInput] = useReducer(
    (current: PayInput, update: Partial<PayInput>) => ({
      ...current,
      ...update,
    }),
    {
      member_code: '',
      product_id: 0,
      qty: 0,
      discount: 0,
      total_pay: 0,
    }
  );

  return (
    <SheetContent side={'bottom'} className="space-y-3">
      <SheetHeader>
        <SheetTitle>Pembayaran</SheetTitle>
        <SheetDescription>
          Lakukan pembayaran untuk menyelesaikan transaksi.
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="totals">Total Harga</Label>
        <Input type="text" value={total} readOnly placeholder="Rp.500.000,00" />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="member-code">Kode Member</Label>
        <Input
          type="text"
          placeholder="2342348234234"
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
          placeholder="Rp.100.000,00"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput({
              discount: Number(e.target.value),
            })
          }
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="payTotals">Total Bayar</Label>
        <Input
          type="text"
          placeholder="Rp.550.000,00"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput({
              total_pay: Number(e.target.value),
            })
          }
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="payback">Kembalian</Label>
        <Input
          type="text"
          placeholder="Rp.50.000,00"
          value={input.total_pay === 0 ? 0 : input.total_pay - total}
          readOnly
        />
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button
            // onClick={() => {
            //   // transactionMutation.mutate()
            //   setInvoiceForm([
            //     {
            //       id: 0,
            //       name: '',
            //       price: 0,
            //       quantity: 0,
            //       total: 0,
            //     },
            //   ]);
            // }}
            onClick={onClick}
          >
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};

export default PayForm;
