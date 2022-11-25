import React from 'react'
import {Link} from 'react-router-dom'

export default function Header() {
  return (
        <header id="header">
            <div className="d-flex flex-column">

                <div className="profile">
                    <img src="assets/img/profile-img.jpg" alt="" className="img-fluid rounded-circle" />
                    <h1 className="text-light"><Link to="/client/moncompte">Alex Smith</Link></h1>
                </div>

                <nav id="navbar" className="nav-menu navbar">
                    <ul>
                        <li><Link to="/client/dashboard" className="nav-link scrollto"><i className="bx bx-home"></i> <span>Accueil</span></Link></li>
                        <li><Link to="/client/moncompte" className="nav-link scrollto"><i className="bx bx-user"></i> <span>Mon Compte</span></Link></li>
                        <li><Link to="/client/historiqueintervention" className="nav-link scrollto"><i className="bx bx-calendar-event"></i> <span>Historique Intervention</span></Link></li>
                        <li><Link to="/client/factureintervention" className="nav-link scrollto"><i className="bx bx-user"></i> <span>Facture Intervention</span></Link></li>
                    </ul>
                </nav>
            </div>
        </header>
  )
}
