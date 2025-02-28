import React from 'react'
import { Outlet } from 'react-router-dom'

const Blogs = () => {
  return (

    
        <div className="min-h-screen bg-background font-sans antialiased">
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">
            <Outlet/>
            </div>
          </div>
        </div>
      

  )
}

export default Blogs
