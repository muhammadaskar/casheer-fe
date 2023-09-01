import OrderForm from '@/components/menu/transaction/OrderForm';

import TransactionTable from '@/components/menu/transaction/TransactionTable';
import { Separator } from '@/components/ui/separator';

import { useAllProductQuery } from '@/hooks/use-product';
// import useOrder from '@/hooks/use-order';

const Transaction = () => {
  const { data: product, status } = useAllProductQuery();

  return (
    <main className="px-2 md:px-5 py-2 md:py-5 space-y-3 md:space-y-5">
      <div className="hidden md:block">
        <h1 className="font-semibold tracking-tight text-2xl">Transaction</h1>
        <p className="text-sm text-muted-foreground">
          This is your transaction page 🤑
        </p>
      </div>
      <Separator className="my-4 hidden md:block" />
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-8">
          {status !== 'loading' ? (
            <OrderForm product={product?.data} />
          ) : (
            <div>Loading...</div>
          )}
          {/* <PayForm /> */}
        </div>
        <TransactionTable />
      </div>
    </main>
  );
};

export default Transaction;
