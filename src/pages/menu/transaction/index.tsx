import OrderForm from '@/components/menu/transaction/OrderForm';
import PayForm from '@/components/menu/transaction/PayForm';
import TransactionTable from '@/components/menu/transaction/TransactionTable';
import { Separator } from '@/components/ui/separator';
import useOrder from '@/hooks/use-order';

const Transaction = () => {
  const { category } = useOrder();

  return (
    <main className="px-5 py-2">
      <div>
        <h1 className="font-semibold tracking-tight text-2xl">Transaction</h1>
        <p className="text-sm text-muted-foreground">
          This is your transaction page 🤑
        </p>
      </div>
      <Separator className="my-4" />
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-8">
          <OrderForm category={category} />
          <PayForm />
        </div>
        <TransactionTable />
      </div>
    </main>
  );
};

export default Transaction;
