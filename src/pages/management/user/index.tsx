/* eslint-disable react-hooks/exhaustive-deps */
import {
  columns,
  userColumnMobile,
} from '@/components/management/user/UserColumn';
import { UserTable } from '@/components/management/user/UserTable';
import SkeletonTable from '@/components/skeleton-loader/SkeletonTable';
import { Separator } from '@/components/ui/separator';
import { useUserQuery } from '@/hooks/use-user';
import { UserParseType } from '@/types/user-type';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const { data, status } = useUserQuery();
  const navigate = useNavigate();
  const userDataParse: UserParseType = JSON.parse(
    localStorage.getItem('user-data-parse') || ''
  );

  useEffect(() => {
    if (userDataParse?.role === 0) {
      return navigate('/user');
    }
    return navigate('/');
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>

      <main className="px-2 md:px-5 mx-auto md:py-5 space-y-3">
        <h1 className="hidden md:block font-semibold tracking-tight text-2xl">
          User
        </h1>
        <p className="hidden text-sm md:block text-muted-foreground">
          Lorem ipsum dolor amet.
        </p>
        <Separator className="my-4 hidden sm:block" />

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
            <UserTable columns={userColumnMobile} data={data?.data} />
          ) : (
            <SkeletonTable />
          )}
        </div>
      </main>
    </>
  );
};

export default User;
