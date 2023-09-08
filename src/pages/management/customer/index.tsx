import {
  columnMobile,
  columns,
} from '@/components/management/customer/CustomerColumn';
import { CustomerTable } from '@/components/management/customer/CustomerTable';
import SkeletonTable from '@/components/skeleton-loader/SkeletonTable';
import { Separator } from '@/components/ui/separator';
import { useMemberQuery } from '@/hooks/use-member';
import { Helmet } from 'react-helmet';

const Customer = () => {
  const { data, status } = useMemberQuery();

  return (
    <>
      <Helmet>
        <title>Customer</title>
      </Helmet>

      <main className="px-2 md:px-5 mx-auto md:py-5 space-y-3">
        <h1 className="hidden md:block font-semibold tracking-tight text-2xl">
          Customer
        </h1>
        <p className="hidden text-sm md:block text-muted-foreground">
          Lorem ipsum dolor amet.
        </p>
        <Separator className="my-4 hidden md:block" />

        <div className="hidden md:block">
          {status !== 'loading' ? (
            <CustomerTable columns={columns} data={data?.data} />
          ) : (
            <SkeletonTable />
          )}
        </div>

        {/* Mobile */}
        <div className="block md:hidden">
          {status !== 'loading' ? (
            <CustomerTable columns={columnMobile} data={data?.data} />
          ) : (
            <SkeletonTable />
          )}
        </div>
      </main>
    </>
  );
};

export default Customer;
