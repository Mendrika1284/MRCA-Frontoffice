/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { loginService } from '../../_services/login.service'

export default function Header() {

    let donneeUtilisateurStocker = localStorage.getItem('data');
    let toArrayDonneeUtilisateur = JSON.parse(donneeUtilisateurStocker);

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
                    <h1 className="text-light"><a href="/client/moncompte">{toArrayDonneeUtilisateur.connexionClient[0].prenom}</a></h1>
                </div>

                <nav id="navbar" className="nav-menu navbar">
                    <ul>
                        <li><Link to="/artisan/dashboard" className="nav-link scrollto active"><i className="bx bx-home"></i> <span>Accueil</span></Link></li>
                        <li><Link to="/artisan/moncompte" className="nav-link scrollto"><i className="bx bx-user"></i> <span>Mon Compte</span></Link></li>
                        <li><a href="#" onClick={logout} className="nav-link scrollto"><i className="bx bx-lock-open-alt"></i> <span>Se déconnecter</span></a></li>
                    </ul>
                </nav>
            </div>
        </header>
  )
}
