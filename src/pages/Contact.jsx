import React, { useState } from 'react';

/* ---------- Shared styles ---------- */
const inputClass = (error) =>
  `w-full rounded-sm border bg-white px-4 py-3 text-base text-[#333] outline-none transition placeholder:text-gray-400 focus:ring-2 ${
    error
      ? 'border-red-500 focus:ring-red-500/30'
      : 'border-gray-300 focus:border-[#ee7b24] focus:ring-[#ee7b24]/30'
  }`;

const primaryBtn =
  'flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-[#ee7b24] py-3 text-lg text-white shadow-md shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d96a16] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] active:translate-y-0 disabled:pointer-events-none disabled:opacity-60';

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-base text-[#333]">
        {label} <span className="text-[#ee7b24]">*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------- Contact / review form ---------- */
const EMPTY = { name: '', email: '', review: '' };

function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Enter a valid email address.';
    if (form.review.trim().length < 10) e.review = 'Please write at least 10 characters.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status !== 'idle') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);

    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }

    setStatus('sending');
    try {
      // TODO: send `form` to your backend, Firebase, EmailJS or Formspree
      console.log('Contact form:', form);
      setStatus('success');
      setForm(EMPTY);
    } catch {
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="animate-fade-up rounded-md border border-gray-200 bg-white p-5 sm:p-6"
    >
      <h2 className="mb-1 text-xl text-[#333] sm:text-2xl">Send us a message</h2>
      <p className="mb-6 border-b border-gray-200 pb-4 text-base text-gray-600">
        Questions or feedback about a book? Leave your review and we will get back to you.
      </p>

      <div className="flex flex-col gap-5">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={inputClass(errors.name)}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={inputClass(errors.email)}
          />
        </Field>

        <Field id="review" label="Review" error={errors.review}>
          <textarea
            id="review"
            name="review"
            rows={5}
            maxLength={1000}
            placeholder="Write your review or message here..."
            value={form.review}
            onChange={handleChange}
            aria-invalid={!!errors.review}
            aria-describedby={errors.review ? 'review-error' : undefined}
            className={`${inputClass(errors.review)} resize-y`}
          />
        </Field>

        <div role="status" aria-live="polite" className="min-h-6 text-base">
          {status === 'success' && (
            <p className="text-[#2e7d32]">Thank you! Your message has been sent.</p>
          )}
          {status === 'error' && (
            <p className="text-red-600">Something went wrong. Please try again.</p>
          )}
        </div>

        <button type="submit" disabled={status === 'sending'} className={primaryBtn}>
          {status === 'sending' ? 'Sending...' : 'Submit review'}
        </button>
      </div>
    </form>
  );
}

/* ---------- Track your order ---------- */
const STEPS = ['Order placed', 'Processing', 'Shipped', 'Delivered'];

// Demo data so you can test the UI. Replace findOrder() with a real API call.
const DEMO_ORDERS = {
  'BK-1001': { status: 'Order placed', items: 2, total: 142.4 },
  'BK-1002': { status: 'Processing', items: 1, total: 79 },
  'BK-1003': { status: 'Shipped', items: 3, total: 210.5 },
  'BK-1004': { status: 'Delivered', items: 1, total: 69 },
};

async function findOrder(id) {
  // TODO: e.g. const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${id}`);
  //            if (!res.ok) return null;  return res.json();
  return DEMO_ORDERS[id] ?? null;
}

function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [searchedId, setSearchedId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    const id = orderId.trim().toUpperCase();

    setOrder(null);
    setError('');

    if (!id) {
      setError('Please enter your order ID.');
      return;
    }

    setLoading(true);
    try {
      const found = await findOrder(id);
      if (found) {
        setOrder(found);
        setSearchedId(id);
      } else {
        setError(`We could not find an order with ID "${id}". Please check it and try again.`);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order ? STEPS.indexOf(order.status) : -1;

  return (
    <div className="animate-fade-up rounded-md border border-gray-200 bg-white p-5 [animation-delay:150ms] sm:p-6">
      <h2 className="mb-1 text-xl text-[#333] sm:text-2xl">Track your order</h2>
      <p className="mb-6 border-b border-gray-200 pb-4 text-base text-gray-600">
        Enter the order ID from your confirmation email to see where your books are.
      </p>

      <form onSubmit={handleTrack} noValidate className="flex flex-col gap-5">
        <div>
          <label htmlFor="order-id" className="mb-1.5 block text-base text-[#333]">
            Order ID <span className="text-[#ee7b24]">*</span>
          </label>
          <input
            id="order-id"
            type="text"
            placeholder="e.g. BK-1001"
            value={orderId}
            onChange={(e) => {
              setOrderId(e.target.value);
              if (error) setError('');
            }}
            aria-invalid={!!error}
            aria-describedby={error ? 'order-error' : undefined}
            className={inputClass(error)}
          />
        </div>

        <button type="submit" disabled={loading} className={primaryBtn}>
          {loading ? 'Searching...' : 'Track order'}
        </button>
      </form>

      {/* Result */}
      <div aria-live="polite" className="mt-5">
        {error && (
          <p id="order-error" role="alert" className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700">
            {error}
          </p>
        )}

        {order && (
          <div className="rounded-md border border-gray-200 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-lg text-[#333]">Order {searchedId}</p>
              <span className="rounded-full bg-[#ee7b24]/10 px-3 py-1 text-sm font-medium text-[#ee7b24]">
                {order.status}
              </span>
            </div>
            <p className="mt-1 text-base text-gray-600">
              {order.items} {order.items === 1 ? 'item' : 'items'} · Total ${order.total.toFixed(2)}
            </p>

            {/* Progress steps */}
            <ol className="mt-5 flex flex-col">
              {STEPS.map((step, i) => {
                const done = i <= currentStep;
                const last = i === STEPS.length - 1;
                return (
                  <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                    {!last && (
                      <span
                        aria-hidden="true"
                        className={`absolute left-11px top-6 h-full w-0.5 ${
                          i < currentStep ? 'bg-[#ee7b24]' : 'bg-gray-200'
                        }`}
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className={`relative grid size-6 shrink-0 place-items-center rounded-full border-2 ${
                        done ? 'border-[#ee7b24] bg-[#ee7b24] text-white' : 'border-gray-300 bg-white'
                      }`}
                    >
                      {done && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-3.5">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className={`text-base ${done ? 'text-[#333]' : 'text-gray-400'}`}>
                      {step}
                      {i === currentStep && <span className="sr-only"> (current status)</span>}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Page ---------- */
export default function Contact() {
  return (
    <section className="mx-auto max-w-1400px px-6 py-12 lg:px-16 lg:py-16">
      <h1 className="mb-8 border-b border-gray-200 pb-4 text-2xl font-medium text-[#333] lg:text-3xl">
        Contact us
      </h1>

      <div className="grid items-start gap-8 lg:grid-cols-2">
        <ContactForm />
        <TrackOrder />
      </div>
    </section>
  );
}