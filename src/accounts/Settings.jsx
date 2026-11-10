import { useState } from 'react';
import { updateProfile, updatePassword } from 'firebase/auth';
import { auth } from '../context/Firebase';
import DashboardHeader from './DashboardHeader';

// Placeholder rows. The Firebase client SDK cannot list all users, so store
// user profiles in Firestore (a "users" collection) and load them from there.
const USERS = [
  { id: 'USR-1001', name: 'Admin', email: 'admin@example.com' },
  { id: 'USR-1002', name: 'Malcolm Lockyer', email: 'malcolm@example.com' },
];

const inputClass =
  'w-full rounded-sm border border-gray-300 bg-white px-4 py-3 text-base text-[#333] outline-none transition placeholder:text-gray-400 focus:border-[#ee7b24] focus:ring-2 focus:ring-[#ee7b24]/30 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500';

const buttonClass =
  'flex cursor-pointer items-center justify-center rounded-sm bg-[#ee7b24] px-8 py-3 text-base text-white shadow-md shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#d96a16] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] active:translate-y-0 disabled:pointer-events-none disabled:opacity-60';

function Notice({ notice }) {
  if (!notice) return null;
  const isError = notice.type === 'error';
  return (
    <p
      role={isError ? 'alert' : 'status'}
      className={`rounded-sm border px-4 py-3 text-base ${
        isError
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-green-200 bg-green-50 text-green-700'
      }`}
    >
      {notice.text}
    </p>
  );
}

function Card({ title, description, children }) {
  return (
    <section className="rounded-md border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <h3 className="text-xl text-[#333]">{title}</h3>
      {description && <p className="mt-1 text-base text-gray-600">{description}</p>}
      <div className="mt-5 border-t border-gray-200 pt-5">{children}</div>
    </section>
  );
}

const Settings = () => {
  const user = auth.currentUser;

  const [name, setName] = useState(user?.displayName || '');
  const [profileNotice, setProfileNotice] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passwordNotice, setPasswordNotice] = useState(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const initial = (name || user?.email || 'A').charAt(0).toUpperCase();

  async function handleProfile(e) {
    e.preventDefault();
    setProfileNotice(null);

    if (name.trim().length < 2) {
      setProfileNotice({ type: 'error', text: 'Please enter your name (at least 2 characters).' });
      return;
    }

    setProfileLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: name.trim() });
      setProfileNotice({ type: 'success', text: 'Profile updated successfully.' });
    } catch {
      setProfileNotice({ type: 'error', text: 'Could not update your profile. Please try again.' });
    } finally {
      setProfileLoading(false);
    }
  }

  async function handlePassword(e) {
    e.preventDefault();
    setPasswordNotice(null);

    if (password.length < 6) {
      setPasswordNotice({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }
    if (password !== confirm) {
      setPasswordNotice({ type: 'error', text: 'The two passwords do not match.' });
      return;
    }

    setPasswordLoading(true);
    try {
      await updatePassword(auth.currentUser, password);
      setPasswordNotice({ type: 'success', text: 'Password changed successfully.' });
      setPassword('');
      setConfirm('');
    } catch (err) {
      const text =
        err.code === 'auth/requires-recent-login'
          ? 'For security, please log out, log in again, then change your password.'
          : 'Could not change your password. Please try again.';
      setPasswordNotice({ type: 'error', text });
    } finally {
      setPasswordLoading(false);
    }
  }

  return (
    <div>
      <DashboardHeader />

      <div className="p-4 sm:p-6">
        <h2 className="text-2xl font-medium text-[#333] sm:text-3xl">Settings</h2>
        <p className="mt-1 text-base text-gray-600">Update your profile with valid information.</p>

        <div className="mt-6 grid items-start gap-6 xl:grid-cols-2">
          {/* Profile */}
          <Card title="Profile" description="Your name and email address.">
            <form onSubmit={handleProfile} noValidate className="flex flex-col gap-5">
              <Notice notice={profileNotice} />

              <div className="flex items-center gap-4">
                <span
                  className="grid size-16 shrink-0 place-items-center rounded-full bg-[#ee7b24] text-2xl font-medium text-white"
                  aria-hidden="true"
                >
                  {initial}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-lg text-[#333]">{name || 'Your name'}</p>
                  <p className="truncate text-base text-gray-600">{user?.email}</p>
                </div>
              </div>

              <div>
                <label htmlFor="name" className="mb-1.5 block text-base text-[#333]">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-base text-[#333]">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  aria-describedby="email-help"
                  className={inputClass}
                />
                <p id="email-help" className="mt-1 text-sm text-gray-500">
                  Your email is your login, so it cannot be changed here.
                </p>
              </div>

              <div>
                <button type="submit" disabled={profileLoading} className={buttonClass}>
                  {profileLoading ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </form>
          </Card>

          {/* Password */}
          <Card title="Password" description="Choose a new password for your account.">
            <form onSubmit={handlePassword} noValidate className="flex flex-col gap-5">
              <Notice notice={passwordNotice} />

              <div>
                <label htmlFor="password" className="mb-1.5 block text-base text-[#333]">
                  New password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="confirm" className="mb-1.5 block text-base text-[#333]">
                  Confirm new password
                </label>
                <input
                  id="confirm"
                  name="confirm"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Re-enter the new password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <button type="submit" disabled={passwordLoading} className={buttonClass}>
                  {passwordLoading ? 'Updating...' : 'Change password'}
                </button>
              </div>
            </form>
          </Card>
        </div>

        {/* Users table */}
        <div className="mt-8">
          <h3 className="text-xl text-[#333] font-medium">Users Info</h3>
          <div className="mt-4 overflow-x-auto rounded-md border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-480px text-left text-base">
              <thead className="border-b border-gray-200 bg-gray-50 text-sm text-gray-600">
                <tr>
                  <th scope="col" className="px-5 py-3 font-medium">User ID</th>
                  <th scope="col" className="px-5 py-3 font-medium">User Name</th>
                  <th scope="col" className="px-5 py-3 font-medium">User Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {USERS.map((u) => (
                  <tr key={u.id} className="transition-colors hover:bg-gray-50">
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-[#333]">{u.id}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-[#333]">{u.name}</td>
                    <td className="px-5 py-4 text-gray-600">{u.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {USERS.length === 0 && (
              <p className="px-5 py-12 text-center text-base text-gray-600">No users found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;