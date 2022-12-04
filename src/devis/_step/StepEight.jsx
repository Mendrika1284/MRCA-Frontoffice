/* eslint-disable no-unused-vars */
import { React, useState } from "react";

const StepEight = ({ nextStep, handleChange, prevStep, values }) => {
//creating error state for validation
const [error, setError] = useState(false);

values.email = localStorage.getItem('email');

// after form submit validating the form data using validator
const submitFormData = (e) => {
e.preventDefault();

if(values.email === ""){
  setError(true)
}else{
  nextStep();
}
};

 return ( 
     <div data-aos="fade-left">
          {error ? (
            <div class="alert alert-warning" data-aos="zoom-in-up" role="alert">
                Veuillez choisir le type de travaux
            </div>
            ):('')}
         <form onSubmit={submitFormData}>
             <div className="mb-3">
                 <input type="email" defaultValue={values.email} onMouseMove={handleChange("email")} onChange={handleChange("email")} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
             </div>
             <div style={{ display: "flex", justifyContent: "space-around" }}>
           <button className="btn btn-warning" onClick={prevStep}>Précédent</button>
           <button className="btn btn-primary" type="submit">Envoyer</button>
         </div>
         </form>
     </div>
  );
}
 
export default StepEight;