import OrderForm from '@/components/menu/transaction/OrderForm';
import PayForm from '@/components/menu/transaction/PayForm';
import TransactionTable from '@/components/menu/transaction/TransactionTable';

const Transaction = () => {
  return (
    <main className="py-5 px-10">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-8">
          <OrderForm />
          <PayForm />
        </div>
        <TransactionTable />
      </div>
    </main>
  );
};

export default Transaction;
