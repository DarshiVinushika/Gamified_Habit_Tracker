import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'

function InternDashboard() {
  return (
    <div className='flex min-h-screen bg-gray-100'
        style={{
        background: "radial-gradient(closest-side at 50% 50%, #3B82F6 0%, #8B5CF6 100%)",
    }}>
        <Sidebar/>
      <div>
        Intern Dashboard Content
      </div>
      
    </div>
  )
}

export default InternDashboard
