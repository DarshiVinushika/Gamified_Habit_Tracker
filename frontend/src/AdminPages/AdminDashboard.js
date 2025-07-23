import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import AdminSidebar from './AdminSidebar'

function AdminDashboard() {
  return (
    <div>
      <AdminSidebar/>
      <h1>Admin Dashboard</h1>
      <Footer/>
    </div>
  )
}

export default AdminDashboard
