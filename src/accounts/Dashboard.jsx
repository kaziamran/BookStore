import React from 'react'
import DashboardContent from './DashboardContent'
import SideBar from './SideBar'

const Dashboard = () => {
  return (
    <div className='dashboard-wrap flex'>
      <SideBar/>
      <DashboardContent/>
    </div>
  )
}

export default Dashboard