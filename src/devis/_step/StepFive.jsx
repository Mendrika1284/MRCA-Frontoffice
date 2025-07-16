/* eslint-disable no-unused-vars */
import { React, useState } from "react";

const StepFive = ({ nextStep, handleChange, prevStep, values }) => {
  const [dateDebut, setDateDebut] = useState('');
  //const [erreurDateDebut, setErreurDateDebut] = useState(false);
  const [dateFin, setDateFin] = useState('');
  //const [erreurDateFin, setErreurDateFin] = useState(false);
  const [error, setError] = useState(false);
  //const [differenceJour, setDifferenceJour] = useState(false);
  //const [differenceMois, setDifferenceMois] = useState(false);


  var date1 = new Date(values.dateDebut);
  var date2 = new Date(values.dateFin);

  var Difference_In_Time = date2.getTime() - date1.getTime();
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  /*console.log("Date debut: "+dateDebut);
  console.log("Date fin: "+dateFin);
  console.log("Difference: "+Difference_In_Days);*/

  var Difference_In_Months = Math.floor(Difference_In_Days/30);
  //console.log("Mois: "+Difference_In_Months)



  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();
    if(values.dateFin === "" || values.dateDebut === ""  || Difference_In_Months <= 0 || date1 > date2){
        setError(true)
    }else{
        nextStep();
    }
  };


 return ( 
     <div data-aos="fade-left">
        {error ? (
          <div className="alert alert-warning" data-aos="zoom-in-up" role="alert">
              Veuillez entrer des données valides
          </div>
        ):('')}
         <form onSubmit={submitFormData}>
             <div className="mb-3">
                <input type="date" className="form-control" defaultValue={values.dateDebut} onChange={handleChange("dateDebut")} onMouseEnter={(e) => setDateDebut(e.target.value)}/>
             </div>
             <div className="mb-3">
             <input type="date" className="form-control" defaultValue={values.dateFin} onChange={handleChange("dateFin")} onMouseEnter={(e) => setDateFin(e.target.value)}/>
             </div>
             <div className="mb-3">
                <p className="text-start text-success">Durée des travaux estimés: {String(Difference_In_Months)} Mois</p>
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