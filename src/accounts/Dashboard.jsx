import { auth } from '../context/Firebase';
import DashboardHeader from './DashboardHeader';

const stats = [
  { label: 'Total revenue', value: '$1,400' },
  { label: 'Total orders', value: '18' },
  { label: 'Total customers', value: '6' },
  { label: 'Pending deliveries', value: '2' },
];

const Dashboard = () => {
  const user = auth.currentUser;
  const name = user?.displayName || user?.email || 'Admin';
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className='overflow-hidden'>
      <DashboardHeader/>
      <div className='p-6'>
        <h2 className="text-2xl font-medium text-[#333] sm:text-3xl">Dashboard</h2>
        <p className="mt-1 text-base text-gray-600">A summary of your store.</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
            <div
                key={stat.label}
                className="rounded-md border border-gray-200 bg-white p-5 shadow-sm"
            >
                <h2 className="text-base text-gray-600">{stat.label}</h2>
                <p className="mt-2 text-3xl font-medium text-[#333]">{stat.value}</p>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;