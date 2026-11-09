import { useState } from 'react';
import DashboardHeader from './DashboardHeader';

// Placeholder data. Status values are lowercase so they match TABS and STATUS_STYLES.
const CUSTOMERS_LIST = [
  { cus_id: 'CUST-1001', cus_name: 'Malcolm Lockyer', status: 'active', date: 'Nov 05, 2026', orders: 2, t_amount: 144 },
  { cus_id: 'CUST-1002', cus_name: 'John Mia', status: 'inactive', date: 'Nov 06, 2026', orders: 1, t_amount: 2244 },
];

const TABS = ['all', 'active', 'inactive'];

const STATUS_STYLES = {
  active: 'bg-green-50 text-green-700 ring-green-600/20',
  inactive: 'bg-red-50 text-red-700 ring-red-600/20',
};

const money = (n) => `$${n.toFixed(2)}`;
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-sm ring-1 ring-inset ${STATUS_STYLES[status]}`}
    >
      {capitalize(status)}
    </span>
  );
}

const Customers = () => {
  const [customers] = useState(CUSTOMERS_LIST);
  const [activeTab, setActiveTab] = useState('all');
  const [query, setQuery] = useState('');

  const countFor = (tab) =>
    tab === 'all' ? customers.length : customers.filter((c) => c.status === tab).length;

  const q = query.trim().toLowerCase();
  const visibleCustomers = customers.filter((c) => {
    const matchesTab = activeTab === 'all' || c.status === activeTab;
    const matchesSearch =
      !q ||
      c.cus_id.toLowerCase().includes(q) ||
      c.cus_name.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  return (
    <div>
      <DashboardHeader />
      <div className="p-4 sm:p-6">
        <h2 className="text-2xl font-medium text-[#333] sm:text-3xl">Customers</h2>
        <p className="mt-1 text-base text-gray-600">All the customers' information.</p>

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
            <label htmlFor="search-customer" className="sr-only">
              Search customer
            </label>
            <input
              type="search"
              name="search-customer"
              id="search-customer"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by customer name or ID"
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
                <th scope="col" className="px-5 py-3 font-medium">Customer ID</th>
                <th scope="col" className="px-5 py-3 font-medium">Customer Name</th>
                <th scope="col" className="px-5 py-3 font-medium">Status</th>
                <th scope="col" className="px-5 py-3 font-medium">Joined Date</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Orders</th>
                <th scope="col" className="px-5 py-3 text-right font-medium">Total Spent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibleCustomers.map((c) => (
                <tr key={c.cus_id} className="transition-colors hover:bg-gray-50">
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-[#333]">{c.cus_id}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-[#333]">{c.cus_name}</td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">{c.date}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-right text-gray-600">{c.orders}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-right font-medium text-[#333]">
                    {money(c.t_amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {visibleCustomers.length === 0 && (
            <p className="px-5 py-12 text-center text-base text-gray-600">
              No customers match your search. Try a different name or switch to the All tab.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;