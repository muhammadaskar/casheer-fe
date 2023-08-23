import { columns } from '@/components/management/customer/CustomerColumn';
import { CustomerTable } from '@/components/management/customer/CustomerTable';
import SkeletonTable from '@/components/skeleton-loader/SkeletonTable';
import { Separator } from '@/components/ui/separator';
import { useMemberQuery } from '@/hooks/use-member';

const Customer = () => {
  const { data, status } = useMemberQuery();

  return (
    <main className="px-2 md:px-5 mx-auto py-2 md:py-5 space-y-3">
      <h1 className="hidden md:block font-semibold tracking-tight text-2xl">
        Customer
      </h1>
      <p className="text-sm text-muted-foreground">Lorem ipsum dolor amet.</p>
      <Separator className="my-4 hidden md:block" />

      <div className="hidden md:block">
        {status !== 'loading' ? (
          <CustomerTable columns={columns} data={data?.data} />
        ) : (
          <SkeletonTable />
        )}
      </div>
    </main>
  );
};

export default Customer;
