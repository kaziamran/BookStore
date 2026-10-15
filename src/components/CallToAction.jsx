import { useState } from 'react';

const SOCIALS = [
  {
    name: 'Twitter',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
      </svg>
    ),
  },
  {
    name: 'Google Plus',
    href: '#',
    icon: <span className="font-sans text-lg font-bold leading-none">G+</span>,
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg viewBox="0 0 320 512" fill="currentColor" className="h-5" aria-hidden="true">
        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden="true">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8z" />
        <path d="M9.6 15.6V8.4l6.2 3.6z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Flickr',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
        <rect x="1" y="1" width="22" height="22" rx="5" />
        <circle cx="8" cy="12" r="3.2" fill="white" />
        <circle cx="16" cy="12" r="3.2" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Vimeo',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
        <path d="M23.9765 6.4168c-.105 2.338-1.739 5.5429-4.894 9.6088-3.2679 4.247-6.0258 6.3699-8.2898 6.3699-1.409 0-2.578-1.294-3.553-3.881l-1.9179-7.1138c-.719-2.584-1.488-3.878-2.312-3.878-.179 0-.806.378-1.8809 1.132l-1.129-1.457a315.06 315.06 0 003.501-3.1279c1.579-1.368 2.765-2.085 3.5539-2.159 1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.5069.5389 2.45 1.1309 3.674 1.7759 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.8679 3.434-5.7568 6.7619-5.6368 2.4729.06 3.6279 1.664 3.4929 4.7969z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="size-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.7" fill="currentColor" />
      </svg>
    ),
  },
];

export default function CallToAction() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send `email` to your API / newsletter service (Mailchimp, etc.)
    console.log('Subscribed:', email);
    setStatus('success');
    setEmail('');
  };

  return (
    <section aria-label="Newsletter and social links" className="border-t border-gray-200 bg-[#f5f5f5] font-['Alike',serif]">
      <div className="mx-auto grid max-w-1400px gap-14 px-6 py-14 md:grid-cols-2 md:gap-10 lg:px-16 lg:py-20">
        {/* Left: Newsletter */}
        <div className="animate-fade-up">
          <h2 className="text-xl font-medium uppercase text-[#222] sm:text-2xl">Newsletter</h2>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
            {/* Orange icon circle */}
            <div className="animate-pop-in grid size-20 shrink-0 place-items-center rounded-full bg-[#ee7b24] text-white [animation-delay:200ms] lg:size-88px">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-8" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="flex-1">
              <p className="text-lg leading-snug text-[#333]">
                Subscribe to get news about new books, special offers and discounts straight to your inbox.
              </p>

              <form onSubmit={handleSubmit} className="mt-5">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'success') setStatus('idle');
                    }}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    className="min-w-0 flex-1 rounded-sm border border-gray-300 bg-white px-4 py-3 text-base text-[#333] outline-none transition placeholder:text-gray-400 focus:border-[#ee7b24] focus:ring-2 focus:ring-[#ee7b24]/30"
                  />
                  <button
                    type="submit"
                    className="rounded-sm bg-[#ee7b24] px-7 py-3 text-base text-white shadow-md shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d96a16] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] active:translate-y-0"
                  >
                    Subscribe
                  </button>
                </div>

                <p role="status" aria-live="polite" className="mt-3 min-h-6 text-base text-[#2e7d32]">
                  {status === 'success' && 'Thank you! You are now subscribed.'}
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Right: Social links */}
        <div className="animate-fade-up [animation-delay:200ms]">
          <h2 className="text-xl font-medium uppercase text-[#222] sm:text-2xl">Stay connected</h2>

          <ul className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            {SOCIALS.map((s, i) => (
              <li key={s.name} style={{ animationDelay: `${300 + i * 80}ms` }} className="animate-pop-in">
                <a
                  href={s.href}
                  aria-label={s.name}
                  className="grid size-14 place-items-center rounded-full bg-white text-[#222] shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-[#ee7b24] hover:text-white hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] sm:size-16"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}