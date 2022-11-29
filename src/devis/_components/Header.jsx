/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {

  return (
        <header id="header">
            <div className="d-flex flex-column">

                <div className="profile">
                    <img src="assets/img/profile-img.jpg" alt="" className="img-fluid rounded-circle" />
                    <h1 className="text-light"><a href="/client/moncompte">Alex Smith</a></h1>
                </div>

                <nav id="navbar" className="nav-menu navbar">
                    <ul>
                        <li><Link to="/client/dashboard" className="nav-link scrollto active"><i className="bx bx-home"></i> <span>Accueil</span></Link></li>
                    </ul>
                </nav>
            </div>
        </header>
  )
}
