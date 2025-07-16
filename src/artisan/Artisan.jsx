import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

export default function Artisan() {
  return (
    <div className='Artisan'>
        <Header/>
        <main id="main">
            <Outlet/>
        </main>
    </div>
  )
}
