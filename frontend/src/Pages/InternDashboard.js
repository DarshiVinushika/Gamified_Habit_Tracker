import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'


function InternDashboard() {
  return (
    <div className='flex min-h-screen bg-gray-100'>
        <Navbar/>
        <main className="flex-grow md:ml-64">
          <div className="p-8">
            Intern Dashboard Content
          </div>
        </main>
        
    </div>
  )
}

export default InternDashboard
