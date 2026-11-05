import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../accounts/SideBar'

const AccountLayout = () => {
  return (
    <section className='min-h-screen flex'>
      <SideBar/>
      <main className='w-full'><Outlet/></main>
    </section>
  )
}

export default AccountLayout