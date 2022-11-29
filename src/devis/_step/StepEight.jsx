import { React, useState } from "react";

const StepEight = ({ nextStep, handleFormData, prevStep, values }) => {
//creating error state for validation
const [error, setError] = useState(false);

// after form submit validating the form data using validator
const submitFormData = (e) => {
e.preventDefault();

nextStep();
};

 return ( 
     <div>
         <form onSubmit={submitFormData}>
             <div class="mb-3">
                 <label for="exampleFormControlInput1" class="form-label">Email address</label>
                 <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
             </div>
             <div style={{ display: "flex", justifyContent: "space-around" }}>
           <button className="btn btn-warning" onClick={prevStep}>Précédent</button>
           <button className="btn btn-primary" type="submit">Suivant</button>
         </div>
         </form>
     </div>
  );
}
 
export default StepEight;