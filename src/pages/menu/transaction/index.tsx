import OrderComponent from '@/components/pages/menu/transaction/OrderComponent';
import PayComponent from '@/components/pages/menu/transaction/PayComponent';

const Transaction = () => {
  return (
    <div className="px-5 py-10">
      <div className="flex flex-row">
        <div className=" flex flex-col space-y-3 ">
          <OrderComponent />
          <PayComponent />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
