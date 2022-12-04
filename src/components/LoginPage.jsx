import React, { useState } from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginService } from "../_services/login.service";

const LoginPage = () => {

  let navigate = useNavigate();

    const [credentials, setCredentials] = useState({
      email: '',
      password: ''
    })

    const onChange = (e) => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
    }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(credentials)
    axios.post('http://localhost:8000/api/login_check', credentials)
    .then(res => {
      console.log(res)
      loginService.saveToken(res.data.token)
      loginService.saveEmail(e.target.email.value)
      navigate('/client')
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
                <input type="password" className="form-control" placeholder="Password" id="password" name="password" value={credentials.password} onChange={onChange} required/>
                
              </div>
              
              <div className="d-flex mb-5 align-items-center">
                <label className="control control--checkbox mb-0"><span className="caption">Se souvenir de moi</span>
                  <input type="checkbox" />
                  <div className="control__indicator"></div>
                </label>
                <span className="ml-auto"><Link to="/creerCompte" className="forgot-pass">Créer un compte</Link></span>
              </div>

              <div className="btn-group">
                <input type="submit" value="Se connecter" className="btn btn-block btn-success mr-4" />
                <Link to="/demande_devis"><button className="btn btn-primary">Demander devis</button></Link>
              </div>

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