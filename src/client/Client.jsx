import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

export default function Client() {
  return (
    <div>
        <Header/>
        <main id="main">
        <div className="section-title"  data-aos="fade-up">
          <h2>Resume</h2>
          <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
        </div>
            <Outlet/>
        </main>
    </div>
  )
}
