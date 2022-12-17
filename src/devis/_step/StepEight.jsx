/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { React, useState } from "react";
import { loginService } from "../../_services/login.service";

const utilisateurURL = "http://localhost:8000/apiplatform/utilisateurs?page=1&email=";

const StepEight = ({ nextStep, handleChange, prevStep, values }) => {
//creating error state htmlFor validation
const [error, setError] = useState(false);
const [isLogged, setIsLogged] = useState(false); // Pour verifier si l'utilisateur est déjà connecter
const [input, setInput] = useState(''); // Pour recevoir l'entrer reçu sur le champs de connexion
const [isMailExist, setIsMyEmail] = useState(true); // Pour voir si le mail venant d'API Platform existe
const [isMailInscriptionExist, setIsInscriptionEmail] = useState(false); // Pour voir si le mail venant d'API Platform existe
const [isSignup, setIsSignup] = useState(false); // Apres click sur 's'inscrire ?'
const [isSignedUp, setIsSignedUp] = useState(false); // Apres inscription

var emailStored = localStorage.getItem('email');
values.email = localStorage.getItem('email');

function handleChangeEmail(event) {
  setInput(event.target.value);
  axios.get(utilisateurURL+String(event.target.value)).then((response) => {
    console.log(response.data['hydra:member'].length)
    if(response.data['hydra:member'].length===0){
      setIsMyEmail(false);
    }else{
      setIsMyEmail(true);
    }
  })
  .catch(error => console.error(`Erreur: ${error}`));
}

function handleChangeEmailInscription(event) {
  setInput(event.target.value);
  axios.get(utilisateurURL+String(event.target.value)).then((response) => {
    console.log(response.data['hydra:member'].length)
    if(response.data['hydra:member'].length===0){
      setIsInscriptionEmail(false);
    }else{
      setIsInscriptionEmail(true);
    }
  })
  .catch(error => console.error(`Erreur: ${error}`));
}


function toogleInscription() {
  if(error){
    setError(false)
  }
  return setIsSignup(true);
}

function untoogleInscription() {
  return setIsSignup(false);
}

const [inscription, setInscription] = useState({
  nom: '',
  prenom: '',
  contact: parseInt(''),
  adresse: '',
  email: '',
  roles: ['ROLE_CLIENT'],
  password: ''
})

const onChangeInscription = (e) => {
  setInscription({
    ...inscription,
    [e.target.name]: e.target.value
  })
}

const onSubmitInscription = (e) => {
  e.preventDefault()
  console.log(inscription)
  if(isMailInscriptionExist){
    
  }else{
    axios.post('http://localhost:8000/apiplatform/utilisateurs', inscription)
    .then(res => {
      console.log(res)
      loginService.saveEmail(e.target.email.value)
      setIsMyEmail(true);
      setIsSignedUp(true);
    })
    .catch(error => console.log(error))
  }
}


function CheckEmail(){
  if(emailStored != null){
    return (
        <form onSubmit={submitFormData}>
          {isSignedUp ? (<p className="text-success"><i className="bx bx-check-circle"></i> Votre compte a été creer avec succes</p>) : ('')}
            <div className="mb-3">
                 <input type="email" defaultValue={values.email} onMouseOver={handleChange("email")} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button className="btn btn-warning" onClick={prevStep}>Précédent</button>
              <button className="btn btn-primary" type="submit">Envoyer</button>
            </div>
        </form>
    )
  }else{
    return(
    <div>
            {
            isMailExist===true ?
            (
            <div>
              <form onSubmit={submitFormData}>
              {
                isSignup ? ('') : (
                  <div className="mb-3">
                  <input type="email" defaultValue={input} onMouseOut={handleChangeEmail} className="form-control" id="exampleFormControlInput2" placeholder="name@example.com" />
                  </div>
                )
              }
                <p className="text-success"><i className="bx bx-check-circle"></i> Ce compte existe</p>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <button className="btn btn-warning" onClick={prevStep}>Précédent</button>
                    <button className="btn btn-primary" type="submit">Envoyer</button>
                </div>
                </form>
              </div>
            )
            :
            (
              <div> 
                { 
                  isSignup===true ? (
                    <div>
                      <p><a onClick={untoogleInscription} className="text-primary">Se connecter ?</a></p>
                      <form onSubmit={onSubmitInscription}>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" onMouseLeave={onChangeInscription} onMouseOut={handleChangeEmailInscription} defaultValue={inscription.email} placeholder="name@example.com" required/>
                        {isMailInscriptionExist ? (<p className="text-danger"><i className="bx bx-x-circle"></i> Ce compte existe déjà</p>) : ('')}
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput2" className="form-label">Nom</label>
                        <input type="text" className="form-control" name="nom" onMouseLeave={onChangeInscription} defaultValue={inscription.nom} id="exampleFormControlInput2" placeholder="" required/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput3" className="form-label">Prénom</label>
                        <input type="text" className="form-control" name="prenom" onMouseLeave={onChangeInscription} defaultValue={inscription.prenom} id="exampleFormControlInput3" placeholder="" required/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput4" className="form-label">Contact</label>
                        <input type="text" className="form-control" name="contact" onMouseLeave={onChangeInscription} defaultValue={isNaN(inscription.contact) ? (''): (inscription.contact)} id="exampleFormControlInput4" placeholder="" required/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput5" className="form-label">Adresse</label>
                        <input type="text" className="form-control" name="adresse" onMouseLeave={onChangeInscription} defaultValue={inscription.adresse} id="exampleFormControlInput5" placeholder="" required/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput6" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control" name="password" onMouseLeave={onChangeInscription} defaultValue={inscription.password} id="exampleFormControlInput6" placeholder="" required/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput7" className="form-label">Confirmer mot de passe</label>
                        <input type="password" className="form-control" name="confirmPassword" id="exampleFormControlInput7" placeholder="" required/>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <button className="btn btn-warning" onClick={prevStep}>Précédent</button>
                        <button className="btn btn-primary" type="submit">S'inscrire</button>
                      </div>
                      </form>
                    </div>
                  ) : 
                  (
                    <div>
                    <form onSubmit={submitFormData}>
                      {
                        isSignup ? ('') : (
                          <div className="mb-3">
                          <input type="email" defaultValue={input} onMouseOut={handleChangeEmail} className="form-control" id="exampleFormControlInput2" placeholder="name@example.com" />
                          </div>
                        )
                      }
                      <p data-aos="fade-up"> <i className="bx bx-x-circle text-danger"></i> Ce compte n'existe pas <a onClick={toogleInscription} className="text-primary">S'inscrire ?</a></p>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <button className="btn btn-warning" onClick={prevStep}>Précédent</button>
                            <button className="btn btn-primary" type="submit">Envoyer</button>
                        </div>
                    </form>
                    </div>
                  )
                }
              </div>
            )}
    </div>
  )
  }
}

// after form submit validating the form data using validator
const submitFormData = (e) => {
e.preventDefault();

if(values.email === ""){
  setError(true)
}else if(isMailExist === false){
  setError(true)
}else{
  nextStep();
}
};

 return ( 
     <div data-aos="fade-left">
          {error ? (
            <div className="alert alert-warning" data-aos="zoom-in-up" role="alert">
                Veuillez entrer votre email
            </div>
            ):('')}
         <CheckEmail/>
     </div>
  );
}
 
export default StepEight;