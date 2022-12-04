import React, { useState } from "react";


const StepOne = ({ nextStep, handleChange, values }) => {

    const [error, setError] = useState(false);
  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    if(values.typeTravaux === ""){
        setError(true)
    }else{
        nextStep();
    }
  };

    return ( 
        <div data-aos="zoom-in-up">
            {error ? (
                <div class="alert alert-warning" data-aos="zoom-in-up" role="alert">
                    Veuillez choisir le type de travaux
                </div>
            ):('')}
            <form onSubmit={submitFormData} className="form-group" >
            <select className="form-control mb-4" value={values.typeTravaux} onChange={handleChange("typeTravaux")}>
                <option value="">Type de travaux</option>
                <option value="Orange">Orange</option>
                <option value="Radish">Radish</option>
                <option value="Cherry">Cherry</option>
            </select>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary " type="submit">Suivant</button>
                </div>
            </form>
        </div>
     );
}
 
export default StepOne;