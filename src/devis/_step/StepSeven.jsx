/* eslint-disable no-unused-vars */
import { React, useState } from "react";

const StepSeven = ({ nextStep, handleChange, prevStep, values }) => {
//creating error state for validation
const [error, setError] = useState(false);

// after form submit validating the form data using validator
const submitFormData = (e) => {
e.preventDefault();

nextStep();
};

 return ( 
     <div data-aos="fade-left">
         <form onSubmit={submitFormData}>
             <div className="mb-3">
                 <textarea className="form-control" name="infoSupp" defaultValue={values.infoSupp} onChange={handleChange("infoSupp")} />
             </div>
             <div style={{ display: "flex", justifyContent: "space-around" }}>
           <button className="btn btn-warning" onClick={prevStep}>Précédent</button>
           <button className="btn btn-primary" type="submit">Suivant</button>
         </div>
         </form>
     </div>
  );
}
 
export default StepSeven;