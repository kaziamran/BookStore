import { useState } from 'react';
import CallToAction from '../components/CallToAction';
import FeaturedBooks from '../components/FeaturedBooks';

const CATEGORIES = [
  { id: 'all', label: 'All products' },
  { id: 'best', label: 'Best products' },
  { id: 'featured', label: 'Featured products' },
  { id: 'new', label: 'New arrival' },
  { id: 'sale', label: 'On sale' },
];

const SORT_OPTIONS = [
  { id: 'new', label: 'Newest first' },
  { id: 'old', label: 'Oldest first' },
];

const Shop = () => {
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('new');

  const activeLabel = CATEGORIES.find((c) => c.id === category)?.label;

  return (
    <>
      <section className="mx-auto max-w-1400px px-6 py-12 lg:px-16 lg:py-16">
        <h1 className="mb-8 border-b border-gray-200 pb-4 text-2xl font-medium text-[#333] lg:text-3xl">
          Shop
        </h1>

        <div className="grid items-start gap-8 lg:grid-cols-[260px_1fr]">
          {/* Categories */}
          <aside
            aria-label="Categories"
            className="animate-fade-up rounded-md border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-6 lg:p-5"
          >
            <h2 className="text-xl text-[#333] lg:border-b lg:border-gray-200 lg:pb-4">Categories</h2>

            <div className="-mx-1 mt-3 overflow-x-auto px-1 lg:mx-0 lg:mt-4 lg:overflow-visible lg:px-0">
              <ul className="flex w-max gap-2 lg:w-auto lg:flex-col lg:gap-1">
                {CATEGORIES.map((c) => {
                  const active = category === c.id;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => setCategory(c.id)}
                        aria-pressed={active}
                        className={`w-full cursor-pointer whitespace-nowrap rounded-sm px-4 py-2.5 text-left text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] ${
                          active
                            ? 'bg-[#ee7b24] text-white'
                            : 'border border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-[#333] lg:border-transparent'
                        }`}
                      >
                        {c.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Products */}
          <div className="min-w-0">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-lg text-[#333]">{activeLabel}</p>

              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-base text-gray-600">
                  Sort by
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="cursor-pointer rounded-sm border border-gray-300 bg-white px-4 py-2.5 text-base text-[#333] outline-none transition focus:border-[#ee7b24] focus:ring-2 focus:ring-[#ee7b24]/30"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* FeaturedBooks must read these props for the filter and sort to apply */}
            <FeaturedBooks category={category} sort={sort} />
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
};

export default Shop;