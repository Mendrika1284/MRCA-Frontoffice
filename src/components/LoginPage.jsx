import React, { useState } from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from "react-router-dom";

const LoginPage = () => {
//  const [email, setEmail] = useState('')
//  const [password, setPassword] = useState('')

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
                <span className="ml-auto"><Link to="#" className="forgot-pass">Mot de passe Oublier</Link></span> 
              </div>

              <input type="submit" value="Se connecter" className="btn btn-block btn-success" />

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