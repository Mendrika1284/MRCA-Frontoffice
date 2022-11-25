import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

export default function Client() {
  return (
    <div className='Client'>
        <Header/>
        <main id="main">
            <Outlet/>
        </main>
    </div>
  )
}
