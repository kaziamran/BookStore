import { React, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { app } from '../firebase'

const auth = getAuth(app);

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createUser = () => {
    createUserWithEmailAndPassword(auth, email, password).then(value => alert("Success"));
  };


  const inputClass =
    'w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-base text-[#333] outline-none transition placeholder:text-gray-400 focus:border-[#ee7b24] focus:ring-2 focus:ring-[#ee7b24]/30';

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-1400px items-center justify-center px-6 py-12 lg:px-16 lg:py-16">
      <div className="animate-fade-up w-full max-w-md rounded-md border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-medium text-[#333] sm:text-3xl">Sign Up</h1>
        <p className="mt-2 text-base text-gray-600">Please Register using account detail bellow.</p>

        <form className="mt-6 flex flex-col gap-5">

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-base text-[#333]">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <label htmlFor="password" className="text-base text-[#333]">
                Password
              </label>
            </div>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className={`${inputClass} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 grid w-12 cursor-pointer place-items-center text-gray-500 transition hover:text-[#ee7b24] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#ee7b24]"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                    <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.1A9.8 9.8 0 0112 5c5 0 8.5 4 9.5 7a11.7 11.7 0 01-2.7 4.2M6.6 6.6A11.6 11.6 0 002.5 12c1 3 4.5 7 9.5 7a9.7 9.7 0 004.1-.9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-5" aria-hidden="true">
                    <path d="M2.5 12C3.5 9 7 5 12 5s8.5 4 9.5 7c-1 3-4.5 7-9.5 7s-8.5-4-9.5-7z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            onClick={createUser}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-[#ee7b24] py-3 text-lg text-white shadow-md shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d96a16] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] active:translate-y-0 disabled:pointer-events-none disabled:opacity-60"
          >
            {loading && (
              <svg viewBox="0 0 24 24" fill="none" className="size-5 animate-spin" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            )}
            {loading ? 'Sign Up...' : 'Sign Up'}
          </button>
        </form>

        {/* Create account */}
        <div className="mt-6 border-t border-gray-200 pt-6 text-center text-base text-gray-600">
          Do have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-[#ee7b24] transition-colors hover:text-[#d96a16] hover:underline focus-visible:outline-2 focus-visible:outline-[#ee7b24]"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignUp;