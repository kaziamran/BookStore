import DashboardHeader from './DashboardHeader';

const Customers = () => {

  return (
    <div className='overflow-hidden'>
      <DashboardHeader/>
      <div className='p-6'>
        <h2 className="text-2xl font-medium text-[#333] sm:text-3xl">Customers</h2>
        <p className="mt-1 text-base text-gray-600">All the customers informations</p>

      </div>
    </div>
  );
};

export default Customers;