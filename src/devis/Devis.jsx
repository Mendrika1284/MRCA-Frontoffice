import React from "react";
import { Component } from "react";
import StepEight from "./_step/StepEight";
import StepFinal from "./_step/StepFinal";
import StepFive from "./_step/StepFive";
import StepOne from "./_step/StepOne";
import StepSeven from "./_step/StepSeven";
import StepSix from "./_step/StepSix";
import StepTwo from "./_step/StepTwo";

export class Devis extends Component {

  state = {
    step: 1,
    typeTravaux:"",
    choixTypeTravaux:"",
    latitude: "",
    longitude: "",
    adresse: "",
    dateDebut: "",
    dateFin: "",
    document: "",
    infoSupp:"",
    email:""
}

//proceed to the next react_step_form
nextStep = () => {
  const { step } = this.state;
  this.setState({
      step: step + 1 
  });
}

//Go back to previous page
prevStep = () => {
  const { step } = this.state;
  this.setState({
      step: step - 1 
  });
}

//Handle fields change

handleChange = input => e => {
  this.setState({[input]: e.target.value});
}

render() {
  const { step } = this.state;
  const {typeTravaux,choixTypeTravaux,latitude,longitude,adresse,dateDebut,dateFin,document,infoSupp,email } = this.state;
  const values = {typeTravaux,choixTypeTravaux,latitude,longitude,adresse,dateDebut,dateFin,document,infoSupp,email }


  switch (step) {
    // Step 1 - Choisir type de travaux
    case 1:
      return (
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="Devis col-md-6">
              <div className="card text-center" style={{ marginTop: 300 }} data-aos="fade-left">
                <div className="card-header">
                Quels travaux souhaitez-vous réaliser ?
                </div>
                <div className="card-body">
                    <StepOne  nextStep={this.nextStep}
                            handleChange={this.handleChange}
                            values={values} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    // Step 2 - Localisation
    case 2:
      return (
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="Devis col-md-6">
              <div className="card text-center"  style={{ marginTop: 300 }}>
                <div className="card-header">
                  Localisation
                </div>
                <div className="card-body">
                  <StepTwo  nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            values={values} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );


    // Step 3 - Durée des travaux
    case 3:
      return (
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="Devis col-md-6">
              <div className="card text-center" style={{ marginTop: 300 }}>
                <div className="card-header">
                  Durée des travaux
                </div>
                <div className="card-body">
                  <StepFive nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            values={values} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // Step 4 - Documents à fournir
    case 4:
      return (
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="Devis col-md-6">
              <div className="card text-center" style={{ marginTop: 300 }}>
                <div className="card-header">
                  Documents à fournir
                </div>
                <div className="card-body">
                  <StepSix  nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            values={values} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // Step 5 - Information supplémentaire
    case 5:
      return (
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="Devis col-md-6">
              <div className="card text-center" style={{ marginTop: 300 }}>
                <div className="card-header">
                  Information supplémentaire
                </div>
                <div className="card-body">
                  <StepSeven nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            values={values} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // Step 6 - Connexion/Inscription
    case 6:
      return (
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="Devis col-md-6">
              <div className="card text-center" style={{ marginTop: 300 }}>
                <div className="card-header">
                  Connexion/inscription
                </div>
                <div className="card-body">
                  <StepEight nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            handleChange={this.handleChange}
                            values={values} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 7:
      return (
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="Devis col-md-6">
              <div className="card text-center" style={{ marginTop: 300 }}>
                <div className="card-body">
                  <StepFinal values={values} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    // default case to show nothing
    default:
      return (
        <div>
        </div>
      );
    }
  }
}
 
export default Devis;