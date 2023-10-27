/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import ChartComponent from '@/components/menu/dashboard/ChartComponent';
import OverviewComponent from '@/components/menu/dashboard/OverviewComponent';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import {
  FolderOutputIcon,
  LineChartIcon,
  UserIcon,
  Wallet,
} from 'lucide-react';
import Transaction from '../transaction';
import Report from '../report';
import { useState } from 'react';
import {
  useCasheerTotalQuery,
  useItemOutQuery,
  useSaleQuery,
} from '@/hooks/use-dashboard';
import { rupiahFormat } from '@/lib/utils';
import SkeletonCard from '@/components/skeleton-loader/SkeletonCard';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const [value, setValue] = useState('Dashboard');
  const { data: sale, status } = useSaleQuery();
  const { data: itemOut } = useItemOutQuery();
  const { data: casheer } = useCasheerTotalQuery();

  const dashboardData = [
    {
      title: 'Keuntungan',
      value: rupiahFormat(
        sale?.data.amount === undefined ? 0 : sale?.data.amount
      ),
      desc: '1 bulan terakhir',
      icon: <LineChartIcon className="w-3 h-3 md:w-4 md:h-4" />,
    },
    {
      title: 'Penjualan',
      value: rupiahFormat(
        sale?.data.amount === undefined ? 0 : sale?.data.amount
      ),
      desc: '1 bulan terakhir',
      icon: <Wallet className="w-3 h-3 md:w-4 md:h-4" />,
    },
    {
      title: 'Barang keluar',
      value: `${
        itemOut?.data.total_quantity === undefined
          ? 0
          : itemOut?.data.total_quantity
      }`,
      desc: '1 bulan terakhir',
      icon: <FolderOutputIcon className="w-3 h-3 md:w-4 md:h-4" />,
    },
    {
      title: 'Pegawai',
      value: casheer?.data.total_casheer,
      desc: 'Kasir',
      icon: <UserIcon className="w-3 h-3 md:h-4 md:w-4" />,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <main className="px-2 md:px-5 py-2 md:py-5 space-y-3 md:space-y-5">
        <div>
          <h1 className="hidden font-semibold tracking-tight text-2xl md:block">
            Dashboard
          </h1>
          <h1 className="font-semibold tracking-tight text-2xl block md:hidden">
            {value}
          </h1>
          <p className="text-sm text-muted-foreground hidden md:block">
            This is your dashboard 😁
          </p>
        </div>
        <Separator className="md:my-4 hidden md:block" />

        <div className="hidden md:flex flex-col space-y-5">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {dashboardData.map((item) =>
              status !== 'loading' ? (
                <OverviewComponent
                  key={item.title}
                  title={item.title}
                  total={item.value}
                  desc={item.desc}
                  icon={item.icon}
                />
              ) : (
                <SkeletonCard
                  key={item.title}
                  title={item.title}
                  desc={item.desc}
                  icon={item.icon}
                />
              )
            )}
          </div>
          <ChartComponent />
        </div>

        {/* Mobile */}
        <Tabs className="block md:hidden space-y-3" defaultValue="overview">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="overview" onClick={() => setValue('Dashboard')}>
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="transaction"
              onClick={() => setValue('Transaction')}
            >
              Transaction
            </TabsTrigger>
            <TabsTrigger value="report" onClick={() => setValue('Report')}>
              Report
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="flex md:hidden flex-col space-y-5 mt-7">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {dashboardData.map((item) => (
                  <OverviewComponent
                    key={item.title}
                    title={item.title}
                    total={item.value}
                    desc={item.desc}
                    icon={item.icon}
                  />
                ))}
              </div>
              <ChartComponent />
            </div>
          </TabsContent>
          <TabsContent value="transaction">
            <Transaction />
          </TabsContent>
          <TabsContent value="report">
            <Report />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default Dashboard;
