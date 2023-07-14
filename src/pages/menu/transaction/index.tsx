import OrderForm from '@/components/pages/menu/transaction/OrderForm';
import PayForm from '@/components/pages/menu/transaction/PayForm';

const Transaction = () => {
  return (
    <div className="px-5 py-10">
      <div className="flex flex-row">
        <div className=" flex flex-col space-y-3 ">
          <OrderForm />
          <PayForm />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
