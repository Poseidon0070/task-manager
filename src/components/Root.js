import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

function Root() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Root
