import { React, useState } from "react";

const StepFive = ({ nextStep, handleChange, prevStep, values }) => {

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
     <div data-aos="fade-left">
        {error ? (
          <div class="alert alert-warning" data-aos="zoom-in-up" role="alert">
              Veuillez choisir la durée des travaux
          </div>
        ):('')}
         <form onSubmit={submitFormData}>
             <div className="mb-3">
             <select className="form-control mb-4" value={values.duree} onChange={handleChange("duree")}>
                <option value="">Durée des travaux</option>
                <option value="Orange">Orange</option>
                <option value="Radish">Radish</option>
                <option value="Cherry">Cherry</option>
            </select>
             </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button className="btn btn-warning" onClick={prevStep}>Précédent</button>
            <button className="btn btn-primary" type="submit">Suivant</button>
          </div>
         </form>
     </div>
  );
}
 
export default StepFive;