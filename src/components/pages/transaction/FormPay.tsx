import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FormPay = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl pb-3">Pembayaran</CardTitle>
        <hr />
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
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
      </CardContent>
      <CardFooter>
        <Button className="w-full">Bayar</Button>
      </CardFooter>
    </Card>
  );
};

export default FormPay;
