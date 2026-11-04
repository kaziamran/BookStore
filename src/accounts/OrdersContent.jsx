import { auth } from '../context/Firebase';

const icons = {
  bell: 'M20 17H22V19H2V17H4V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V17ZM18 17V10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10V17H18ZM9 21H15V23H9V21Z',
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}

const OrdersContent = () => {
    const user = auth.currentUser;
    const name = user?.displayName || user?.email || 'Admin';
    const initial = name.charAt(0).toUpperCase();

  return (
    <div className='w-full overflow-hidden'>
      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-end gap-4 border-b border-gray-200 bg-white px-4 py-3 md:px-8">
          <button
            type="button"
            aria-label="Notifications"
            className="grid size-10 cursor-pointer place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#ee7b24] focus-visible:outline-2 focus-visible:outline-[#ee7b24]"
          >
            <Icon name="bell" />
          </button>

          <div className="flex items-center gap-3">
            <span
              className="grid size-10 place-items-center rounded-full bg-[#ee7b24] text-base font-medium text-white"
              aria-hidden="true"
            >
              {initial}
            </span>
            <p className="max-w-40 truncate text-base text-[#333]">{name}</p>
          </div>
        </header>
      </div>
      <div className='p-6'>
        <h2 className="text-2xl font-medium text-[#333] sm:text-3xl">Orders</h2>
        <p className="mt-1 text-base text-gray-600">Manage and track all customer orders.</p>

      </div>
    </div>
  );
};

export default OrdersContent;