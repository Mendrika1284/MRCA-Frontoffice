/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { loginService } from '../../_services/login.service'

export default function Header() {

    let navigate = useNavigate()

    const logout = () => {
        loginService.logout()
        navigate('/')
    }

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
                        <li><Link to="/client/moncompte" className="nav-link scrollto"><i className="bx bx-user"></i> <span>Mon Compte</span></Link></li>
                        <li><Link to="/client/historiqueintervention" className="nav-link scrollto"><i className="bx bx-calendar-event"></i> <span>Historique Intervention</span></Link></li>
                        <li><Link to="/client/factureintervention" className="nav-link scrollto"><i className="bx bx-bookmark-minus"></i> <span>Facture Intervention</span></Link></li>
                        <li><Link to="/demande_devis" className="nav-link scrollto"><i className="bx bx-tag"></i> <span>Demander un devis</span></Link></li>
                        <li><Link to="/client/listedevis" className="nav-link scrollto"><i className="bx bx-sort-up"></i> <span>Liste de mes devis</span></Link></li>
                        <li><a href="#" onClick={logout} className="nav-link scrollto"><i className="bx bx-lock-open-alt"></i> <span>Se déconnecter</span></a></li>
                    </ul>
                </nav>
            </div>
        </header>
  )
}
