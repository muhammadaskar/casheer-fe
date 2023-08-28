import { Separator } from '@/components/ui/separator';

const User = () => {
  return (
    <main className="px-2 md:px-5 mx-auto py-2 md:py-5 space-y-3">
      <h1 className="hidden md:block font-semibold tracking-tight text-2xl">
        User
      </h1>
      <p className="hidden text-sm md:block text-muted-foreground">
        Lorem ipsum dolor amet.
      </p>
      <Separator className="my-4 hidden md:block" />

      <div className="hidden md:block">
        {/* {status !== 'loading' ? (
          <CustomerTable columns={columns} data={data?.data} />
        ) : (
          <SkeletonTable />
        )} */}
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        {/* {status !== 'loading' ? (
          <CustomerTable columns={columnMobile} data={data?.data} />
        ) : (
          <SkeletonTable />
        )} */}
      </div>
    </main>
  );
};

export default User;
