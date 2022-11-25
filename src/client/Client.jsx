import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

export default function Client() {
  return (
    <div>
        <Header/>
        <main id="main">
            <Outlet/>
        </main>
    </div>
  )
}
