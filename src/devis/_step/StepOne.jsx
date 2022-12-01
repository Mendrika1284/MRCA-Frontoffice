import React from "react";


const StepOne = ({ nextStep, handleFormData, values }) => {


  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
      nextStep();
  };

    return ( 
        <div data-aos="zoom-in-up">
            <form onSubmit={submitFormData} className="form-group" >
                <select onChange={handleFormData("typeTravaux")} className="form-select mb-4" aria-label="Default select example">
                    <option defaultValue>Choisir type de travaux</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" type="submit">Suivant</button>
                </div>
            </form>
        </div>
     );
}
 
export default StepOne;