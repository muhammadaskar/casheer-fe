import FormOrder from '@/components/pages/transaction/FormOrder';
import FormPay from '@/components/pages/transaction/FormPay';
import TransactionTable from '@/components/pages/transaction/TransactionTable';
import React from 'react';

const Transaction = () => {
  return (
    <main className="py-5 px-10">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="flex flex-col space-y-8">
          <FormOrder />
          <FormPay />
        </div>
        <TransactionTable />
      </div>
    </main>
  );
};

export default Transaction;
