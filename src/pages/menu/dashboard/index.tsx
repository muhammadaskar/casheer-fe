import UserIcon from '@/assets/icon/UserIcon';
import ChartComponent from '@/components/pages/menu/dashboard/ChartComponent';
import OverviewComponent from '@/components/pages/menu/dashboard/OverviewComponent';

const dashboardData = [
  {
    title: 'Keuntungan',
    value: 'Rp.500.000,00',
    desc: '1 bulan terakhir',
  },
  {
    title: 'Penjualan',
    value: 'Rp.1.500.000,00',
    desc: '1 bulan terakhir',
  },
  {
    title: 'Barang keluar',
    value: '100/pcs',
    desc: '1 bulan terakhir',
  },
  {
    title: 'Pegawai',
    value: '2',
    desc: 'Kasir',
    icon: <UserIcon />,
  },
];

const Dashboard = () => {
  return (
    <div className="px-5 py-10">
      <div className="flex flex-col space-y-5">
        <div className="grid lg:grid-cols-4 space-x-3">
          {dashboardData.map((item) => (
            <OverviewComponent
              title={item.title}
              total={item.value}
              desc={item.desc}
              icon={item.icon}
            />
          ))}
        </div>
        <ChartComponent />
      </div>
    </div>
  );
};

export default Dashboard;
