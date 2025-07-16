/* eslint-disable no-unused-vars */
import { React, useState } from "react";

const StepSix = ({ nextStep, handleChange, prevStep, values }) => {
  const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

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
                 <input type="file" name="document" defaultValue={values.document} onChange={changeHandler} onMouseEnter={handleChange("document")} className="form-control" id="exampleFormControlInput1"/>
             </div>
             {
             isFilePicked ? (
                <div>
                  <p>Filename: {selectedFile.name}</p>
                  <p>Filetype: {selectedFile.type}</p>
                  <p>Size in bytes: {selectedFile.size}</p>
                  <p>
                    lastModifiedDate:{' '}
                    {selectedFile.lastModifiedDate.toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p>Select a file to show details</p>
              )}
             <div style={{ display: "flex", justifyContent: "space-around" }}>
           <button className="btn btn-warning" onClick={prevStep}>Précédent</button>
           <button className="btn btn-primary" type="submit">Suivant</button>
         </div>
         </form>
     </div>
  );
}
 
export default StepSix;