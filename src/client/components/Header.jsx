/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { loginService } from '../../_services/login.service'

export default function Header() {

    let donneeUtilisateurStocker = localStorage.getItem('data');
    let toArrayDonneeUtilisateur = JSON.parse(donneeUtilisateurStocker);
    const [isLoading, setIsLoading] = useState(false);
    const [activeLink, setActiveLink] = useState('/client/dashboard');

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
                        <li><Link to="/client/dashboard" className={`nav-link scrollto ${activeLink === '/client/dashboard' ? 'active' : ''}`} onClick={() => handleClick('/client/dashboard')}><i className="bx bx-home"></i> <span>Accueil</span></Link></li>
                        <li><Link to="/client/moncompte" className={`nav-link scrollto ${activeLink === '/client/moncompte' ? 'active' : ''}`} onClick={() => handleClick('/client/moncompte')}><i className="bx bx-user"></i> <span>Mon Compte</span></Link></li>
                        <li><Link to="/client/historiqueintervention" className={`nav-link scrollto ${activeLink === '/client/historiqueintervention' ? 'active' : ''}`} onClick={() => handleClick('/client/historiqueintervention')}><i className="bx bx-calendar-event"></i> <span>Historique Intervention</span></Link></li>
                        <li><Link to="/client/factureintervention" className={`nav-link scrollto ${activeLink === '/client/factureintervention' ? 'active' : ''}`} onClick={() => handleClick('/client/factureintervention')}><i className="bx bx-bookmark-minus"></i> <span>Facture Intervention</span></Link></li>
                        <li><Link to="/client/rendezvous" className={`nav-link scrollto ${activeLink === '/client/rendezvous' ? 'active' : ''}`} onClick={() => handleClick('/client/rendezvous')}><i className="bx bx-walk"></i> <span>Rendez vous</span></Link></li>
                        <li><Link to="/demande_devis" className={`nav-link scrollto ${activeLink === '/client/demande_devis' ? 'active' : ''}`} onClick={() => handleClick('/client/demande_devis')}><i className="bx bx-tag"></i> <span>Demander un devis</span></Link></li>
                        <li><Link to="/client/listedevis" className={`nav-link scrollto ${activeLink === '/client/listedevis' ? 'active' : ''}`} onClick={() => handleClick('/client/listedevis')}><i className="bx bx-sort-up"></i> <span>Liste de mes devis</span></Link></li>
                        <li><a href="#" onClick={logout} className="nav-link scrollto"> {
                            isLoading ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>) : (<i className="bx bx-lock-open-alt"></i> )
                        } <span>Se déconnecter</span></a></li>
                    </ul>
                </nav>
            </div>
        </header>
  )
}
