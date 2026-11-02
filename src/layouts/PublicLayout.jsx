import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import TopMenu from '../components/TopMenu'
import Footer from '../components/Footer'

const PublicLayout = () => {
  return (
    <>
        <Navbar/>
        <TopMenu/>
        <main><Outlet/></main>
        <Footer/>
    </>
  )
}

export default PublicLayout