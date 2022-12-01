import React from "react";
import { useState } from "react";
import StepEight from "./_step/StepEight";
import StepFinal from "./_step/StepFinal";
import StepFive from "./_step/StepFive";
import StepFour from "./_step/StepFour";
import StepNine from "./_step/StepNine";
import StepOne from "./_step/StepOne";
import StepSeven from "./_step/StepSeven";
import StepSix from "./_step/StepSix";
import StepThree from "./_step/StepThree";
import StepTwo from "./_step/StepTwo";

const Devis = () => {
  //state for steps
  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState({
    latitude: "",
    longitude: "",
    age: "",
    email: ""
  })

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = input => e => {
    // input value from the form
    const {value} = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData(prevState => ({
      ...prevState,
      [input]: value
  }));
  }


// javascript switch case to show different form in each step
  switch (step) {
    // Step 1 - Choisir type de travaux
    case 1:
      return (
        <div className="Devis" id="main">
          <div className="card text-center" data-aos="fade-left">
            <div className="card-header">
              Choisir type de travaux
            </div>
            <div className="card-body">
              <StepOne nextStep={nextStep} handleFormData={handleInputData} values={formData} />
            </div>
          </div>
        </div>
      );
    // Step 2 - Localisation
    case 2:
      return (
        <div className="Devis" id="main">
          <div className="card text-center">
            <div className="card-header">
              Localisation
            </div>
            <div className="card-body">
              <StepTwo nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
            </div>
          </div>
        </div>
      );

    // Step 3 - Nature travaux 
    case 3:
      return (
        <div className="Devis" id="main">
          <div className="card text-center">
            <div className="card-header">
              Nature travaux
            </div>
            <div className="card-body">
              <StepThree nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
            </div>
          </div>
        </div>
      );

    // Step 4 - Type Matériaux
    case 4:
      return (
        <div className="Devis" id="main">
          <div className="card text-center">
            <div className="card-header">
              Type Matériaux
            </div>
            <div className="card-body">
              <StepFour nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
            </div>
          </div>
        </div>
      );

    // Step 5 - Durée des travaux
    case 5:
      return (
        <div className="Devis" id="main">
          <div className="card text-center">
            <div className="card-header">
              Durée des travaux
            </div>
            <div className="card-body">
              <StepFive nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
            </div>
          </div>
        </div>
      );

    // Step 6 - Documents à fournir
    case 6:
      return (
        <div className="Devis" id="main">
          <div className="card text-center">
            <div className="card-header">
              Documents à fournir
            </div>
            <div className="card-body">
              <StepSix nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
            </div>
          </div>
        </div>
      );

    // Step 7 - Information supplémentaire
    case 7:
      return (
        <div className="Devis" id="main">
          <div className="card text-center">
            <div className="card-header">
              Information supplémentaire
            </div>
            <div className="card-body">
              <StepSeven nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
            </div>
          </div>
        </div>
      );

    // Step 8 - Connexion/Inscription
    case 8:
      return (
        <div className="Devis" id="main">
          <div className="card text-center">
            <div className="card-header">
              Connexion/inscription
            </div>
            <div className="card-body">
              <StepEight nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
            </div>
          </div>
        </div>
      );
    // Step 9 - Liste des sociétés pour envoyer la demande 
    case 9:
      return (
        <div className="Devis" id="main">
          <div className="card text-center">
            <div className="card-header">
              Liste des sociétés pour envoyer la demande 
            </div>
            <div className="card-body">
              <StepNine nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
            </div>
          </div>
        </div>
      );

    // Step 10 - Liste des sociétés pour envoyer la demande 
    case 10:
      return (
        <div className="Devis" id="main">
          <div className="card text-center">
            <div className="card-body">
              <StepFinal />
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
 
export default Devis;