import React from 'react'
import { auth } from '../context/Firebase';

const icons = {
  bell: 'M20 17H22V19H2V17H4V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V17ZM18 17V10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10V17H18ZM9 21H15V23H9V21Z',
};

function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor" aria-hidden="true">
      <path d={icons[name]} />
    </svg>
  );
}


const DashboardHeader = () => {
  const user = auth.currentUser;
  const name = user?.displayName || user?.email || 'Admin';
  const initial = name.charAt(0).toUpperCase();

  return (
    <>
     <div className="sticky top-0 z-40 min-w-0 flex-1">
        <header className="flex items-center justify-end gap-3 border-b border-gray-200 bg-white px-4 py-3 md:px-8">
          <button
            type="button"
            aria-label="Mode"
            className="grid size-10 cursor-pointer place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#ee7b24] focus-visible:outline-2 focus-visible:outline-[#ee7b24]"
           >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"></path></svg>
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="grid size-10 cursor-pointer place-items-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#ee7b24] focus-visible:outline-2 focus-visible:outline-[#ee7b24]"
          >
            <Icon name="bell" />
          </button>

          <div className="flex items-center gap-3">
            <span
              className="grid size-10 place-items-center rounded-full bg-[#ee7b24] text-base font-medium text-white"
              aria-hidden="true"
            >
              {initial}
            </span>
            <p className="max-w-40 truncate text-base text-[#333]">{name}</p>
          </div>
        </header>
      </div>
    </>
  )
}

export default DashboardHeader