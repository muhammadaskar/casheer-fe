import SkeletonTable from '@/components/skeleton-loader/SkeletonTable';
import { Separator } from '@/components/ui/separator';
import { unprocessUserColumns } from '@/components/unprocess-users/UnusersColumn';
import { UnprocessUserTable } from '@/components/unprocess-users/UnusersTable';
import { useUnprocessUserQuery } from '@/hooks/use-user';
import { Helmet } from 'react-helmet';

const UnprocessUser = () => {
  const { data, status } = useUnprocessUserQuery();

  return (
    <>
      <Helmet>
        <title>Unprocess Users</title>
      </Helmet>
      <main className="px-2 md:px-5 py-2 md:py-5 space-y-3 md:space-y-5">
        <div className="hidden md:block">
          <h1 className="font-semibold tracking-tight text-2xl">
            Unprocess Users
          </h1>
          <p className="text-sm text-muted-foreground">
            This is your unprocess users page 😔
          </p>
        </div>
        <Separator className="my-4 hidden md:block" />

        <div className="hidden md:block">
          {status !== 'loading' ? (
            data?.data !== null ? (
              <UnprocessUserTable
                columns={unprocessUserColumns}
                data={data?.data}
              />
            ) : (
              <div className="rounded-md border p-10 flex items-center justify-center">
                <div>No user register</div>
              </div>
            )
          ) : (
            <SkeletonTable />
          )}
        </div>
      </main>
    </>
  );
};

export default UnprocessUser;
