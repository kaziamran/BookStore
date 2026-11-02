import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../context/Firebase';

const icons = {
  dashboard: 'M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM6 19H18V9.15745L12 3.7029L6 9.15745V19ZM8 15H16V17H8V15Z',
  orders: 'M20.0049 22H4.00488C3.4526 22 3.00488 21.5523 3.00488 21V3C3.00488 2.44772 3.4526 2 4.00488 2H20.0049C20.5572 2 21.0049 2.44772 21.0049 3V21C21.0049 21.5523 20.5572 22 20.0049 22ZM19.0049 20V4H5.00488V20H19.0049ZM9.00488 6V8C9.00488 9.65685 10.348 11 12.0049 11C13.6617 11 15.0049 9.65685 15.0049 8V6H17.0049V8C17.0049 10.7614 14.7663 13 12.0049 13C9.24346 13 7.00488 10.7614 7.00488 8V6H9.00488Z',
  customers: 'M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z',
  settings: 'M21 18V21H19V18H17V16H23V18H21ZM5 18V21H3V18H1V16H7V18H5ZM11 6V3H13V6H15V8H9V6H11ZM11 10H13V21H11V10ZM3 14V3H5V14H3ZM19 14V3H21V14H19Z',
  logout: 'M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z',
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard', end: true },
  { to: '', label: 'Orders', icon: 'orders' },
  { to: '', label: 'Customers', icon: 'customers' },
  { to: '', label: 'Settings', icon: 'settings' },
];

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 whitespace-nowrap rounded-sm px-3 py-2.5 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] ${
    isActive
      ? 'bg-[#ee7b24]/10 font-medium text-[#d96a16]'
      : 'text-gray-600 hover:bg-gray-100 hover:text-[#333]'
  }`;

export default function SideBar() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const name = user?.displayName || user?.email || 'Admin';
  const initial = name.charAt(0).toUpperCase();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate('/login', { replace: true });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
      <aside className="border-b border-gray-200 bg-white md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex h-full flex-col p-4 md:p-6">
          <Link to="/" className="text-2xl font-bold text-[#ee7b24] md:text-3xl">
            Book Store
          </Link>

          <nav aria-label="Account" className="mt-4 flex gap-2 overflow-x-auto md:mt-8 md:flex-1 md:flex-col md:overflow-visible">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
                <Icon name={item.icon} />
                {item.label}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-3 whitespace-nowrap rounded-sm px-3 py-2.5 text-base text-gray-600 transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] md:mt-auto"
            >
              <Icon name="logout" />
              Log out
            </button>
          </nav>
        </div>
      </aside>     
    </div>
  );
}