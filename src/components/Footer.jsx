import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Each item has a label and a link. Use "#" until the page exists.
const COLUMNS = [
  {
    title: "Products",
    items: [
      { label: "New products", to: "#" },
      { label: "Best sales", to: "#" },
      { label: "Dealer info", to: "#" },
    ],
  },
  {
    title: "Account info",
    items: [
      { label: "My dashboard", to: "/dashboard/" },
      { label: "My Orders", to: "/dashboard/orders" },
      { label: "Personal info", to: "/dashboard/settings" },
    ],
  },
  {
    title: "Social community",
    items: [
      { label: "Facebook", to: "#" },
      { label: "Twitter", to: "#" },
    ],
  }
];

// Placeholder badges. Swap for real logo images, e.g. <img src={assets.visa} />
const PAYMENTS = [
  { name: "Visa", label: "VISA", className: "bg-white text-[#1a1f71] font-extrabold italic" },
  { name: "PayPal", label: "PayPal", className: "bg-white text-[#009cde] font-bold italic" },
  { name: "Mastercard", label: "MasterCard", className: "bg-[#3a5fa8] text-white text-xs font-bold" },
  { name: "2Checkout", label: "2CO", className: "bg-[#6a67b5] text-white text-xl font-semibold" },
  { name: "Moneybookers", label: "moneybookers", className: "bg-white text-gray-600 text-xs" },
  { name: "Cirrus", label: "Cirrus", className: "bg-[#3fa7e0] text-white text-sm font-bold" },
];

const linkClass = "transition-colors hover:text-[#ee7b24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24]";

// Internal paths use <Link> (no page reload). "#" and external URLs use <a>.
function FooterLink({ to, children }) {
  if (to.startsWith("/")) {
    return (
      <Link to={to} className={linkClass}>
        {children}
      </Link>
    );
  }
  return (
    <a href={to} className={linkClass}>
      {children}
    </a>
  );
}

const headingClass = "text-base font-medium uppercase md:text-lg";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  // Show the back-to-top button after scrolling a bit
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="bg-[#222] pt-5 font-['Inter',sans-serif] text-white">
      <div className="mx-auto max-w-1400px px-6 lg:px-16">
        {/* Main columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {COLUMNS.map((col, i) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className={`lg:border-r lg:border-white/10 ${i > 0 ? "lg:pl-12" : ""}`}
            >
              <h3 className={headingClass}>{col.title}</h3>
              <ul className="mt-4 space-y-3 text-base text-gray-200 md:mt-5">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <FooterLink to={item.to}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Store information */}
          <address className="not-italic lg:pl-12">
            <h3 className={headingClass}>Store information</h3>
            <div className="mt-4 space-y-4 text-base text-gray-200 md:mt-5">
              <p>
                Call us now:{" "}
                <a href="tel:123456789" className={linkClass}>
                  01334567XX
                </a>
              </p>
              <p>
                Email us:{" "}
                <a href="mailto:support@domain.com" className={linkClass}>
                  support@domain.com
                </a>
              </p>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-1400px flex-col items-center justify-between gap-5 px-6 py-8 lg:flex-row lg:px-16">
          <ul className="flex flex-wrap justify-center gap-3" aria-label="Accepted payment methods">
            {PAYMENTS.map((p) => (
              <li
                key={p.name}
                title={p.name}
                className={`grid h-12 w-20 place-items-center rounded-sm font-sans ${p.className}`}
              >
                {p.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        aria-hidden={!showTop}
        tabIndex={showTop ? 0 : -1}
        className={`fixed bottom-6 right-6 z-50 grid size-10 cursor-pointer place-items-center rounded-full border-2 border-white bg-[#222] text-white transition duration-300 hover:border-[#ee7b24] hover:text-[#ee7b24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="size-6"
          aria-hidden="true"
        >
          <path d="M6 15l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </footer>
  );
}