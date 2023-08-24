import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PayForm = () => {
  return (
    <>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="totals">Total Harga</Label>
        <Input type="text" placeholder="Rp.500.000,00" />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="disc">Potongan</Label>
        <Input type="text" placeholder="Rp.100.000,00" />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="payTotals">Total Bayar</Label>
        <Input type="text" placeholder="Rp.550.000,00" />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="payback">Kembalian</Label>
        <Input type="text" placeholder="Rp.50.000,00" />
      </div>
    </>
  );
};

export default PayForm;
