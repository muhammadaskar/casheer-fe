import ChartComponent from '@/components/menu/dashboard/ChartComponent';
import OverviewComponent from '@/components/menu/dashboard/OverviewComponent';
import {
  FolderOutputIcon,
  LineChartIcon,
  UserIcon,
  Wallet,
} from 'lucide-react';

const dashboardData = [
  {
    title: 'Keuntungan',
    value: 'Rp.500.000,00',
    desc: '1 bulan terakhir',
    icon: <LineChartIcon className="w-4 h-4" />,
  },
  {
    title: 'Penjualan',
    value: 'Rp.1.500.000,00',
    desc: '1 bulan terakhir',
    icon: <Wallet className="w-4 h-4" />,
  },
  {
    title: 'Barang keluar',
    value: '100/pcs',
    desc: '1 bulan terakhir',
    icon: <FolderOutputIcon className="w-4 h-4" />,
  },
  {
    title: 'Pegawai',
    value: '2',
    desc: 'Kasir',
    icon: <UserIcon className="h-4 w-4" />,
  },
];

const Dashboard = () => {
  return (
    <main className="px-5 py-10">
      <div className="flex flex-col space-y-5">
        <div className="grid lg:grid-cols-4 space-x-3">
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
