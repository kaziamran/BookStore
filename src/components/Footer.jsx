import { useEffect, useState } from "react";

const TOP_LINKS = [
  { label: "Enable Cookies", href: "#" },
  { label: "Privacy And Cookie Policy", href: "#" },
  { label: "Contact Us", href: "#" },
];

const COLUMNS = [
  {
    title: "Products",
    links: ["About us", "Prices drop", "New products", "Best sales"],
  },
  {
    title: "Our company",
    links: ["Contact us", "Sitemap", "Stores", "My account"],
  },
  {
    title: "Your account",
    links: ["Addresses", "Credit slips", "Orders", "Personal info"],
  },
];

// Placeholder badges. Swap for real logo images, e.g. <img src={assets.visa} />
const PAYMENTS = [
  {
    name: "Visa",
    label: "VISA",
    className: "bg-white text-[#1a1f71] font-extrabold italic",
  },
  {
    name: "PayPal",
    label: "PayPal",
    className: "bg-white text-[#009cde] font-bold italic",
  },
  {
    name: "Mastercard",
    label: "MasterCard",
    className: "bg-[#3a5fa8] text-white text-[11px] font-bold",
  },
  {
    name: "2Checkout",
    label: "2CO",
    className: "bg-[#6a67b5] text-white text-xl font-semibold",
  },
  {
    name: "Moneybookers",
    label: "moneybookers",
    className: "bg-white text-gray-500 text-[10px]",
  },
  {
    name: "Cirrus",
    label: "Cirrus",
    className: "bg-[#3fa7e0] text-white text-sm font-bold",
  },
];

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
    <footer className="bg-[#222] text-white pt-5">
      <div className="mx-auto max-w-1400px px-6 lg:px-16">
        {/* Top links */}
        <nav
          aria-label="Footer top links"
          className="border-b border-white/15 py-5"
        >
          <ul className="flex flex-wrap items-center gap-y-2 font-['Inter',serif] text-base">
            {TOP_LINKS.map((link, i) => (
              <li
                key={link.label}
                className={`pr-6 transition-colors hover:text-[#ee7b24] ${
                  i < TOP_LINKS.length - 1
                    ? "mr-6 border-r border-white/40 leading-none"
                    : ""
                }`}
              >
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main columns */}
        <div className="grid gap-10 py-12 font-['Inter',serif] sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {COLUMNS.map((col, i) => (
            <nav
              key={col.title}
              aria-label={col.title}
              className={`lg:border-r lg:border-white/10 ${i > 0 ? "lg:pl-12" : ""}`}
            >
              <h3 className="text-lg font-medium uppercase">{col.title}</h3>
              <ul className="mt-8 space-y-3 text-base text-gray-200">
                {col.links.map((label) => (
                  <li key={label}>
                    <a
                      href="#"
                      className="transition-colors hover:text-[#ee7b24]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Store information */}
          <address className="not-italic lg:pl-12">
            <h3 className="text-lg font-medium uppercase">Store information</h3>
            <div className="mt-8 space-y-5 text-base text-gray-200">
              <p>
                My Company
                <br />
                <span className="mt-2 block">
                  42 avenue des Champs Elysées 75000 Paris France
                </span>
              </p>
              <p>
                Call us now:{" "}
                <a
                  href="tel:123456789"
                  className="transition-colors hover:text-[#ee7b24]"
                >
                  123456789
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@domain.com"
                  className="transition-colors hover:text-[#ee7b24]"
                >
                  support@domain.com
                </a>
              </p>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-1400px flex-col items-center justify-between gap-5 px-6 py-8 font-['Inter',serif] text-lg md:flex-row lg:px-16">
          <p className="text-center md:text-left">
            Copyright © 2021 HasThemes | Built with Koparion by HasThemes.
          </p>

          <ul
            className="flex flex-wrap justify-center gap-2"
            aria-label="Accepted payment methods"
          >
            {PAYMENTS.map((p) => (
              <li
                key={p.name}
                title={p.name}
                className={`grid h-11 w-68px place-items-center rounded-sm font-sans ${p.className}`}
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
        className={`fixed bottom-6 right-6 z-50 grid size-10 place-items-center rounded-full border-2 border-white bg-[#222] text-white transition duration-300 hover:border-[#ee7b24] hover:text-[#ee7b24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
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
          <path
            d="M6 15l6-6 6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </footer>
  );
}
