import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, FC, useReducer } from 'react';

type Props = {
  total: number;
};

type PayInput = {
  total: number;
  potongan: number;
  total_pay: number;
  payback: number;
};

const PayForm: FC<Props> = ({ total }) => {
  const [input, setInput] = useReducer(
    (current: PayInput, update: Partial<PayInput>) => ({
      ...current,
      ...update,
    }),
    {
      total: 0,
      potongan: 0,
      total_pay: 0,
      payback: 0,
    }
  );

  return (
    <>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="totals">Total Harga</Label>
        <Input type="text" value={total} readOnly placeholder="Rp.500.000,00" />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="disc">Potongan</Label>
        <Input
          type="text"
          placeholder="Rp.100.000,00"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput({
              potongan: Number(e.target.value),
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
    </>
  );
};

export default PayForm;
