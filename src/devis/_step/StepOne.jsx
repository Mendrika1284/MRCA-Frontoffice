import axios from "axios";
import React, { useEffect, useState } from "react";

const typeTravauxURL = "http://localhost:8000/apiplatform/type_travauxes";

const StepOne = ({ nextStep, handleChange, values }) => {

    const [typeTravaux, setTypeTravaux] = useState([]);

    useEffect(() => {
        getAllTravaux();
    }, []);

    const getAllTravaux = () => {
        axios.get(typeTravauxURL).then((response) => {
            const allTravaux = response.data['hydra:member'];
            setTypeTravaux(allTravaux);
        })
        .catch(error => console.error(`Erreur: ${error}`));
    }


     function Dajo(){
        if(typeTravaux?.length > 0){
            return (
                typeTravaux.map((fruit) => <option key={fruit.id} value={fruit.id}>{fruit.nom}</option>)
            )
        }
      }


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
                <div className="alert alert-warning" data-aos="zoom-in-up" role="alert">
                    Veuillez choisir le type de travaux
                </div>
            ):('')}
            <form onSubmit={submitFormData} className="form-group" >
            <select className="form-control mb-4" value={values.typeTravaux} onChange={handleChange("typeTravaux")}>
                <option value="">Type de travaux</option>
                <Dajo/>
            </select>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary " type="submit">Suivant</button>
                </div>
            </form>
        </div>
     );
}
 
export default StepOne;