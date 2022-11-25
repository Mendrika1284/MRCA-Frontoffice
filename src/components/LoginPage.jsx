import React from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from "react-router-dom";

const LoginPage = () => (
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
            <form action="#" method="post">
              <div className="form-group first">
                <label htmlFor="email">Email</label>
                <input type="text" className="form-control" id="email" name="email" required/>

              </div><br />
              <div className="form-group last mb-4">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" className="form-control" id="password" name="password" required/>
                
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
 
export default LoginPage;