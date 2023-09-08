import { columns } from '@/components/management/user/UserColumn';
import { UserTable } from '@/components/management/user/UserTable';
import SkeletonTable from '@/components/skeleton-loader/SkeletonTable';
import { Separator } from '@/components/ui/separator';
import { useUserQuery } from '@/hooks/use-user';

const User = () => {
  const { data, status } = useUserQuery();

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
        {status !== 'loading' ? (
          <UserTable columns={columns} data={data?.data} />
        ) : (
          <SkeletonTable />
        )}
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        {status !== 'loading' ? (
          <UserTable columns={columns} data={data?.data} />
        ) : (
          <SkeletonTable />
        )}
      </div>
    </main>
  );
};

export default User;
