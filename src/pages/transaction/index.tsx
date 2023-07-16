import FormOrder from '@/components/pages/transaction/FormOrder';
import FormPay from '@/components/pages/transaction/FormPay';
import React from 'react';

const Transaction = () => {
  return (
    <main className="py-5 px-10">
      <div className="flex flex-row">
        <div className="flex flex-col space-y-3">
          <FormOrder />
          <FormPay />
        </div>
      </div>
    </main>
  );
};

export default Transaction;
