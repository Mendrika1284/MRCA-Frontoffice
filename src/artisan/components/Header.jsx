/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { loginService } from '../../_services/login.service'

export default function Header() {

    let donneeUtilisateurStocker = localStorage.getItem('data');
    let toArrayDonneeUtilisateur = JSON.parse(donneeUtilisateurStocker);
    const [isLoading, setIsLoading] = useState(false);
    const [activeLink, setActiveLink] = useState('/artisan/dashboard');

    const handleClick = (link) => {
        setActiveLink(link);
    }

    let navigate = useNavigate()

    const logout = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            loginService.logout()
            navigate('/')
          }, 1000);
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
                        <li><Link to="/artisan/dashboard" className={`nav-link scrollto ${activeLink === '/artisan/dashboard' ? 'active' : ''}`} onClick={() => handleClick('/artisan/dashboard')}><i className="bx bx-home"></i> <span>Accueil</span></Link></li>
                        <li><Link to="/artisan/moncompte" className={`nav-link scrollto ${activeLink === '/artisan/moncompte' ? 'active' : ''}`} onClick={() => handleClick('/artisan/moncompte')}><i className="bx bx-user"></i> <span>Mon Compte</span></Link></li>
                        <li><Link to="/artisan/agenda" className={`nav-link scrollto ${activeLink === '/artisan/agenda' ? 'active' : ''}`} onClick={() => handleClick('/artisan/agenda')}><i className="bx bx-calendar-event"></i> <span>Mon agenda</span></Link></li>
                        <li><Link to="/artisan/planification" className={`nav-link scrollto ${activeLink === '/artisan/planification' ? 'active' : ''}`} onClick={() => handleClick('/artisan/planification')}><i className="bx bx-calendar-event"></i> <span>Planifier Intervention</span></Link></li>
                        <li><Link to="/artisan/listedevis" className={`nav-link scrollto ${activeLink === '/artisan/listedevis' ? 'active' : ''}`} onClick={() => handleClick('/artisan/listedevis')}><i className="bx bx-sort-up"></i> <span>Liste de mes devis</span></Link></li>
                        <li><a href="#" onClick={logout} className="nav-link scrollto"> {
                            isLoading ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) : (<i className="bx bx-lock-open-alt"></i> )
                        } <span>Se déconnecter</span></a></li>
                    </ul>
                </nav>
            </div>
        </header>
  )
}
