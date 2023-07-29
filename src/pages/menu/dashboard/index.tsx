import ChartComponent from '@/components/menu/dashboard/ChartComponent';
import OverviewComponent from '@/components/menu/dashboard/OverviewComponent';
import { Separator } from '@/components/ui/separator';
import {
  FolderOutputIcon,
  LineChartIcon,
  UserIcon,
  Wallet,
} from 'lucide-react';

const dashboardData = [
  {
    title: 'Keuntungan',
    value: 'Rp.500.000',
    desc: '1 bulan terakhir',
    icon: <LineChartIcon className="w-3 h-3 md:w-4 md:h-4" />,
  },
  {
    title: 'Penjualan',
    value: 'Rp.1.500.000',
    desc: '1 bulan terakhir',
    icon: <Wallet className="w-3 h-3 md:w-4 md:h-4" />,
  },
  {
    title: 'Barang keluar',
    value: '100/pcs',
    desc: '1 bulan terakhir',
    icon: <FolderOutputIcon className="w-3 h-3 md:w-4 md:h-4" />,
  },
  {
    title: 'Pegawai',
    value: '2',
    desc: 'Kasir',
    icon: <UserIcon className="w-3 h-3 md:h-4 md:w-4" />,
  },
];

const Dashboard = () => {
  return (
    <main className="px-5 py-2">
      <div>
        <h1 className="font-semibold tracking-tight text-2xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          This is your dashboard 😁
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col space-y-5">
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
    </main>
  );
};

export default Dashboard;
