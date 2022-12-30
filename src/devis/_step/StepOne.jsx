import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from 'lodash';
import { Carousel, CarouselItem } from 'react-bootstrap';
import '../_styles/StepOne.css'


const typeTravauxURL = "http://localhost:8000/apiplatform/type_travauxes";

const StepOne = ({ nextStep, handleChange, values }) => {

    const [typeTravaux, setTypeTravaux] = useState([]);
    const [selected, setSelected] = useState('');

    const typeTravauxChunks = _.chunk(typeTravaux, 3);

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
//<option key={fruit.id} value={fruit.id}>{fruit.nom}</option>
function getIdTypeTravaux(id) {
  return function(e) {
    e.preventDefault();
    setSelected(id);
  }
}


values.typeTravaux = selected
console.log(values.typeTravaux)

const MemoizedCarousel = React.memo(Carousel);

function GetTypeTravaux(){
  if(typeTravaux?.length > 0){
    return (
      <MemoizedCarousel controls>
        {typeTravauxChunks.map((chunk) =>
          <CarouselItem key={chunk.id}>
            <div className="row row-cols-3 g-4">
              {chunk.map((typeTravaux) =>
                <div className="col">
                  <div key={typeTravaux.id} onClick={getIdTypeTravaux(typeTravaux.id)}  className="card hovering" style={{width: '130px', margin: '8px', height: '220px'}}>
                    <img src="assets/img/portfolio/portfolio-1.jpg" className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h6 className="card-title">{typeTravaux.nom}</h6>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CarouselItem>
        )}
      </MemoizedCarousel>
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
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" onChange={handleChange("choixTypeTravaux")} name="inlineRadioOptions" id="inlineRadio1" value="Rénovation" />
                <label className="form-check-label" htmlFor="inlineRadio1">Rénovation</label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" onChange={handleChange("choixTypeTravaux")} name="inlineRadioOptions" id="inlineRadio2" value="Maintenance" />
                <label className="form-check-label" htmlFor="inlineRadio2">Maintenance</label>
            </div>
            <GetTypeTravaux />
            <div className="form-check form-check-inline">
                <input className="form-control" type="text" style={{opacity: 0}} onMouseEnter={handleChange("typeTravaux")} name="inlineRadioOptions" id="inlineRadio1" defaultValue={values.typeTravaux} readOnly />
            </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary " type="submit">Suivant</button>
                </div>
            </form>
        </div>
     );
}
 
export default StepOne;