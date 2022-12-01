import { React, useState } from "react";

const StepSix = ({ nextStep, handleFormData, prevStep, values }) => {
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
                 <label for="exampleFormControlInput1" className="form-label">Email address</label>
                 <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
             </div>
             <div style={{ display: "flex", justifyContent: "space-around" }}>
           <button className="btn btn-warning" onClick={prevStep}>Précédent</button>
           <button className="btn btn-primary" type="submit">Suivant</button>
         </div>
         </form>
     </div>
  );
}
 
export default StepSix;