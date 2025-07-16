import React, { useEffect, useState } from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginService } from "../_services/login.service";

const LoginPage = () => {
  let navigate = useNavigate();

  // Pour verifier si l'utilisateur est déjà connecter ou non
  useEffect(() => {
    if (localStorage.getItem('data')) {
      let toArrayDonneeUtilisateur = JSON.parse(localStorage.getItem('data'));
      if(toArrayDonneeUtilisateur.connexionClient[0].roles.includes('ROLE_PROFESSIONNAL')){
        navigate('/artisan');
      }else{
        navigate('/client');
      }
    } else {
        navigate('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState({
      email: '',
      password: ''
    })

    const [loginError, setLoginError] = useState(false);
    const [isAccountDesactivate, setAccountDesactivate] = useState(false);

    const onChange = (e) => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
    }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(credentials)
    setIsLoading(true);
    axios.post('http://localhost:8000/connexion_utilisateur/'+credentials.email+'/'+credentials.password)
    .then(res => {
      if(typeof res.data.connexionClient !== 'undefined'){
        if(res.data.connexionClient[0].roles.includes("ROLE_PROFESSIONNAL") && res.data.connexionClient[0].status_compte === 1){
          loginService.saveToken(res.data.token);
          loginService.saveEmail(e.target.email.value);
          loginService.saveId(res.data.connexionClient[0].id);
          loginService.saveIdArtisan(res.data.artisan[0].id);
          loginService.saveData(res.data);
          setTimeout(() => {
            setIsLoading(false);
            navigate('/artisan');
          }, 2000);
        }else if(res.data.connexionClient[0].roles.includes("ROLE_CLIENT") && res.data.connexionClient[0].status_compte === 1){
          loginService.saveToken(res.data.token);
          loginService.saveEmail(e.target.email.value);
          loginService.saveId(res.data.connexionClient[0].id);
          loginService.saveData(res.data);
          setTimeout(() => {
            setIsLoading(false);
            navigate('/client');
          }, 2000);
        }else{
          setLoginError(false);
          setAccountDesactivate(true);
        }
      }else{
        setAccountDesactivate(false);
        setLoginError(true);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    })
    .catch(error => console.log(error))
  }


  return (
    <div>
         <div className="content">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
            <Player  src='https://assets8.lottiefiles.com/private_files/lf30_m6j5igxb.json' className="player" loop autoplay />
        </div>
        <div className="col-md-6 contents">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="mb-4">
               <center><h1>Se connecter</h1></center>
            </div>
            <form onSubmit={onSubmit}>
              <div className="form-group first">
                <input type="email" className="form-control" placeholder="Email" id="email" name="email" value={credentials.email} onChange={onChange} required/>

              </div><br />
              <div className="form-group last mb-4">
                <input type="password" className="form-control" placeholder="Mot de passe" id="password" name="password" value={credentials.password} onChange={onChange} required/>
                
              </div>
              
              <div className="d-flex mb-5 align-items-center">
                <label className="control control--checkbox mb-0"><span className="caption">Se souvenir de moi</span>
                  <input type="checkbox" />
                  <div className="control__indicator"></div>
                </label>
                <span className="ml-auto"><Link to="/creerCompte" className="forgot-pass">Créer un compte</Link></span>
              </div>
              {isLoading ? 
              (
                <div className="d-flex justify-content-center">
                  <div className="spinner-grow text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : 
              (
                <div>
                  <div className="btn-group mb-4">
                    <input type="submit" value="Se connecter" className="btn btn-block btn-success mr-4" />
                    <Link to="/demande_devis"><button className="btn btn-primary">Demander devis</button></Link>
                  </div>
                  {
                    isAccountDesactivate ? (
                      <div className="alert alert-danger" data-aos="fade-up" role="alert">
                        Ce compte est desactiver!
                      </div>
                    ) : ('')
                  }
                  {
                    loginError ? (
                      <div className="alert alert-danger" data-aos="fade-up" role="alert">
                        Email ou mot de passe erroner
                      </div>
                    ) : ('')
                  }
                </div>
              )
              }

            </form>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
  </div>
    </div>
  )
}
 
export default LoginPage;