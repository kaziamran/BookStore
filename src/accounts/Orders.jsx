import { useState } from 'react';
import DashboardHeader from './DashboardHeader';

// Placeholder data. Replace it with real orders from Firestore or your API.
const INITIAL_ORDERS = [
  { id: 'ORD-1001', customer: 'Malcolm Lockyer', product: 'Yellow Book', status: 'completed', date: 'Nov 05, 2026', amount: 144 },
  { id: 'ORD-1002', customer: 'Ayesha Rahman', product: 'The Silent Garden', status: 'processing', date: 'Nov 04, 2026', amount: 62.5 },
  { id: 'ORD-1003', customer: 'Tanvir Ahmed', product: 'Learning React', status: 'processing', date: 'Nov 04, 2026', amount: 38 },
  { id: 'ORD-1004', customer: 'Nusrat Jahan', product: 'River of Stars', status: 'cancelled', date: 'Nov 02, 2026', amount: 27.9 },
  { id: 'ORD-1005', customer: 'Rafiq Hasan', product: 'A Short History of Sylhet', status: 'completed', date: 'Nov 01, 2026', amount: 91 },
  { id: 'ORD-1006', customer: 'Sadia Islam', product: 'Cooking at Home', status: 'completed', date: 'Oct 30, 2026', amount: 54.25 },
  { id: 'ORD-1007', customer: 'raju mia', product: 'Cooking at Home', status: 'completed', date: 'Oct 30, 2026', amount: 54.25 },
  { id: 'ORD-1008', customer: 'Radia hoque', product: 'Cooking at Home', status: 'completed', date: 'Oct 30, 2026', amount: 54.25 },
];

const TABS = ['all', 'completed', 'processing', 'cancelled'];

const STATUS_STYLES = {
  completed: 'bg-green-50 text-green-700 ring-green-600/20',
  processing: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  cancelled: 'bg-red-50 text-red-700 ring-red-600/20',
};

const money = (n) => `$${n.toFixed(2)}`;
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const actionClass =
  'grid size-9 cursor-pointer place-items-center rounded-sm text-gray-500 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24]';

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-sm ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {capitalize(status)}
    </span>
  );
}

const Orders = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [activeTab, setActiveTab] = useState('all');
  const [query, setQuery] = useState('');

  const countFor = (tab) =>
    tab === 'all' ? orders.length : orders.filter((o) => o.status === tab).length;

  const q = query.trim().toLowerCase();
  const visibleOrders = orders.filter((o) => {
    const matchesTab = activeTab === 'all' || o.status === activeTab;
    const matchesSearch =
      !q ||
      o.id.toLowerCase().includes(q) ||
      o.customer.toLowerCase().includes(q) ||
      o.product.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const handleDelete = (order) => {
    if (window.confirm(`Delete order ${order.id}? This cannot be undone.`)) {
      setOrders((prev) => prev.filter((o) => o.id !== order.id));
    }
  };

  return (
    <div>
      <DashboardHeader />

      <div className="p-4 sm:p-6">
        <h2 className="text-2xl font-medium text-[#333] sm:text-3xl">Orders</h2>
        <p className="mt-1 text-base text-gray-600">Manage and track all customer orders.</p>

        {/* Tabs + search */}
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-1 overflow-x-auto px-1">
            <ul className="flex w-max gap-1 rounded-md border border-gray-200 bg-white p-1">
              {TABS.map((tab) => {
                const active = activeTab === tab;
                return (
                  <li key={tab}>
                    <button
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      aria-pressed={active}
                      className={`flex cursor-pointer items-center gap-2 rounded-sm px-4 py-2 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] ${
                        active
                          ? 'bg-[#ee7b24] text-white'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-[#333]'
                      }`}
                    >
                      {capitalize(tab)}
                      <span
                        className={`rounded-full px-2 text-sm ${
                          active ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {countFor(tab)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md overflow-hidden rounded-sm border border-gray-300 bg-white focus-within:border-[#ee7b24] focus-within:ring-2 focus-within:ring-[#ee7b24]/30"
          >
            <label htmlFor="search-order" className="sr-only">
              Search orders
            </label>
            <input
              type="search"
              name="search-order"
              id="search-order"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by order, customer or book"
              className="w-full bg-transparent px-4 py-2.5 text-base text-[#333] outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              aria-label="Search"
              className="cursor-pointer bg-[#ee7b24] px-4 transition-colors hover:bg-[#d96a16] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#333]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-white" aria-hidden="true">
                <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto rounded-md border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-215 text-left text-base">
            <thead className="border-b border-gray-200 bg-gray-50 text-sm text-gray-600">
              <tr>
                <th scope="col" className="px-5 py-3 font-medium">Order No</th>
                <th scope="col" className="px-5 py-3 font-medium">Customer Name</th>
                <th scope="col" className="px-5 py-3 font-medium">Product</th>
                <th scope="col" className="px-5 py-3 font-medium">Status</th>
                <th scope="col" className="px-5 py-3 font-medium">Date</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Amount</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibleOrders.map((order) => (
                <tr key={order.id} className="transition-colors hover:bg-gray-50">
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-[#333]">{order.id}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-[#333]">{order.customer}</td>
                  <td className="px-5 py-4 text-gray-600">{order.product}</td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">{order.date}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-right font-medium text-[#333]">
                    {money(order.amount)}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        aria-label={`View order ${order.id}`}
                        className={`${actionClass} hover:bg-gray-100 hover:text-[#ee7b24]`}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                          <path d="M2.5 12C3.5 9 7 5 12 5s8.5 4 9.5 7c-1 3-4.5 7-9.5 7s-8.5-4-9.5-7z" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label={`Edit order ${order.id}`}
                        className={`${actionClass} hover:bg-gray-100 hover:text-[#ee7b24]`}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                          <path d="M4 20h4L19 9l-4-4L4 16v4zM14 6l4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(order)}
                        aria-label={`Delete order ${order.id}`}
                        className={`${actionClass} hover:bg-red-50 hover:text-red-700`}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                          <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {visibleOrders.length === 0 && (
            <p className="px-5 py-12 text-center text-base text-gray-600">
              No orders match your search. Try a different name or switch to the All tab.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;