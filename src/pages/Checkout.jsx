import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const DISCOUNT_RATE = 0.2; // 20%
const DELIVERY_FEE = 15;

const money = (n) => `$${n.toFixed(2)}`;

const EMPTY_FORM = {
  full_name: '',
  phone: '',
  email: '',
  building: '',
  address: '',
};

const validate = (f) => {
  const e = {};
  if (f.full_name.trim().length < 2) e.full_name = 'Please enter your full name.';
  if (!/^\+?[0-9\s()-]{7,15}$/.test(f.phone.trim())) e.phone = 'Enter a valid phone number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter a valid email address.';
  if (!f.building.trim()) e.building = 'Building / House No / Floor / Street is required.';
  if (f.address.trim().length < 5) e.address = 'Please enter your full address.';
  return e;
};

const inputClass = (error) =>
  `w-full rounded-sm border bg-white px-4 py-3 text-base text-[#333] outline-none transition placeholder:text-gray-400 focus:ring-2 ${
    error
      ? 'border-red-500 focus:ring-red-500/30'
      : 'border-gray-300 focus:border-[#ee7b24] focus:ring-[#ee7b24]/30'
  }`;

function Field({ id, label, error, className = '', children }) {
  return (
    <div className={className}>
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

const Checkout = () => {
  const { state, dispatch } = useCart();
  const { cartItems } = state;

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [placedName, setPlacedName] = useState(null); // set after a successful order

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subTotal * DISCOUNT_RATE;
  const deliveryFee = cartItems.length > 0 ? DELIVERY_FEE : 0;
  const total = subTotal - discount + deliveryFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const found = validate(form);
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    const order = {
      customer: { ...form },
      items: cartItems.map(({ id, title, price, quantity }) => ({ id, title, price, quantity })),
      subTotal,
      discount,
      deliveryFee,
      total,
    };

    // TODO: send `order` to your API here
    console.log('Order placed:', order);

    setPlacedName(form.full_name.trim());
    dispatch({ type: 'CLEAR_CART' });
    setForm(EMPTY_FORM);
  };

  /* ---------- Success ---------- */
  if (placedName) {
    return (
      <section className="mx-auto max-w-xl px-6 py-16 text-center">
        <div className="animate-pop-in rounded-md border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#ee7b24] text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-8" aria-hidden="true">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="mt-5 text-2xl text-[#333]">Thank you, {placedName}!</h1>
          <p className="mt-2 text-lg text-gray-600">Your order has been placed successfully.</p>
          <a
            href="/"
            className="mt-6 inline-block rounded-sm bg-[#ee7b24] px-8 py-3 text-lg text-white shadow-md shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d96a16]"
          >
            Continue shopping
          </a>
        </div>
      </section>
    );
  }

  /* ---------- Empty cart ---------- */
  if (cartItems.length === 0) {
    return (
      <section className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="text-2xl text-[#333]">Your cart is empty</h1>
        <p className="mt-2 text-lg text-gray-600">Add some books before checking out.</p>
        <a
          href="/"
          className="mt-6 inline-block rounded-sm bg-[#ee7b24] px-8 py-3 text-lg text-white shadow-md shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d96a16]"
        >
          Back to shop
        </a>
      </section>
    );
  }

  /* ---------- Checkout ---------- */
  const rowClass = 'flex items-center justify-between text-base text-gray-600';

  return (
    <section className="mx-auto max-w-1400px px-6 py-12 font-['Alike',serif] lg:px-16 lg:py-16">
      <h1 className="mb-8 border-b border-gray-200 pb-4 text-2xl font-medium text-[#333] lg:text-3xl">
        Checkout
      </h1>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left: delivery form */}
        <form
          id="checkout-form"
          onSubmit={handleSubmit}
          noValidate
          className="animate-fade-up rounded-md border border-gray-200 bg-white p-5 sm:p-6"
        >
          <h2 className="mb-6 border-b border-gray-200 pb-4 text-xl text-[#333]">Delivery details</h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="full_name" label="Full name" error={errors.full_name} className="sm:col-span-2">
              <input
                id="full_name"
                name="full_name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={form.full_name}
                onChange={handleChange}
                aria-invalid={!!errors.full_name}
                aria-describedby={errors.full_name ? 'full_name-error' : undefined}
                className={inputClass(errors.full_name)}
              />
            </Field>

            <Field id="phone" label="Phone number" error={errors.phone}>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+880 1XXX XXXXXX"
                value={form.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={inputClass(errors.phone)}
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

            <Field
              id="building"
              label="Building / House No / Floor / Street"
              error={errors.building}
              className="sm:col-span-2"
            >
              <input
                id="building"
                name="building"
                type="text"
                autoComplete="address-line1"
                placeholder="e.g. House 12, Floor 3, Road 5"
                value={form.building}
                onChange={handleChange}
                aria-invalid={!!errors.building}
                aria-describedby={errors.building ? 'building-error' : undefined}
                className={inputClass(errors.building)}
              />
            </Field>

            <Field id="address" label="Address" error={errors.address} className="sm:col-span-2">
              <textarea
                id="address"
                name="address"
                rows={3}
                autoComplete="street-address"
                placeholder="Area, city, postcode"
                value={form.address}
                onChange={handleChange}
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'address-error' : undefined}
                className={`${inputClass(errors.address)} resize-y`}
              />
            </Field>
          </div>
        </form>

        {/* Right: order info */}
        <aside
          aria-label="Order summary"
          className="animate-fade-up rounded-md border border-gray-200 bg-white p-5 [animation-delay:150ms] sm:p-6 lg:sticky lg:top-6"
        >
          <h2 className="border-b border-gray-200 pb-4 text-xl text-[#333]">
            Your order <span className="text-base text-gray-500">({totalItems} items)</span>
          </h2>

          {/* Book cards */}
          <ul className="mt-5 flex max-h-96 flex-col gap-3 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <li key={item.id} className="flex gap-4 rounded-md border border-gray-200 p-3">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-20 w-14 shrink-0 rounded-sm bg-gray-100 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-base text-[#333]">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {item.quantity} × {money(item.price)}
                  </p>
                </div>
                <p className="shrink-0 text-base font-medium text-[#333]">
                  {money(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          {/* Totals */}
          <dl className="mt-5 flex flex-col gap-3 border-t border-gray-200 pt-5">
            <div className={rowClass}>
              <dt>Sub Total</dt>
              <dd className="font-medium text-[#333]">{money(subTotal)}</dd>
            </div>
            <div className={rowClass}>
              <dt>Discount (-{DISCOUNT_RATE * 100}%)</dt>
              <dd className="font-medium text-[#ee7b24]">-{money(discount)}</dd>
            </div>
            <div className={rowClass}>
              <dt>Delivery Fee</dt>
              <dd className="font-medium text-[#333]">{money(deliveryFee)}</dd>
            </div>
          </dl>

          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 text-xl text-[#333]">
            <p>Total</p>
            <p className="font-medium text-[#ee7b24]">{money(total)}</p>
          </div>

          {/* Submits the form on the left via the form attribute */}
          <button
            type="submit"
            form="checkout-form"
            className="mt-5 w-full rounded-sm bg-[#ee7b24] py-3 text-lg text-white shadow-md shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d96a16] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] active:translate-y-0"
          >
            Place order
          </button>
        </aside>
      </div>
    </section>
  );
};

export default Checkout;