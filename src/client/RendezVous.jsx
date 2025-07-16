/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const RendezVous = () => {
  const URL = "http://localhost:8000/rendezVousClientAValider/"+parseInt(localStorage.getItem("id"));
  /*Etat rendez-vous
    0 - envoyer par l'artisan
    1 - valider par le client
    2 - refuser par le client

    5 - envoyer par le client
    6 - valider par l'artisan
  */
    const [rendezVousAValiderClient, setRendezVousAValiderClient] = useState([]);
    const [detailRendezVous, setDetailRendezVous] = useState();

    useEffect(() => {
      getAllRendezVousAValider();
  }, []);

  const getAllRendezVousAValider = () => {
      axios.get(URL).then((response) => {
          const allTravaux = response.data.rendez_vous;
          setRendezVousAValiderClient(allTravaux);
      })
      .catch(error => console.error(`Erreur: ${error}`));
  }

  const getDataRendezVous = (id) => {
    axios.get("http://localhost:8000/getRendezVousById/"+id).then((response) => {
      const allTravaux = response.data.rendez_vous;
      setDetailRendezVous(allTravaux);
  })
  .catch(error => console.error(`Erreur: ${error}`));
}


const validerRDV = (id) => {
  axios.patch(`http://localhost:8000/validerRendezVousByClient/${id}`, null)
    .then(response => {
      setRendezVousAValiderClient(response.data.rendez_vous);
      toast.success("Rendez-vous valider avec succes");
    })
    .catch(error => {
      console.log(error);
    });
}

const refuserRDV = (id) => {
  axios.patch(`http://localhost:8000/refuserRendezVousByClient/${id}`, null)
    .then(response => {
      setRendezVousAValiderClient(response.data.rendez_vous);
      toast.error("Rendez-vous annuler");
    })
    .catch(error => {
      console.log(error);
    });
}



  function ListeRendezVousAValider(){
    if(rendezVousAValiderClient?.length > 0){
      return (
        rendezVousAValiderClient.map((item) => {
            return(
              <tr key={item.id}>
                <td className="text-center">{item.id}</td>
                <td className="text-center">{item.titre}</td>
                <td className="text-center">{item.description}</td>
                <td className="text-center">{item.date}</td>
                <td className="text-center">{item.heureDebut}</td>
                <td className="text-center">{item.heureFin}</td>
                <td className="text-center" style={{cursor: 'pointer'}}>
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      Action
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                      <li><Link className="dropdown-item" style={{textDecoration: "none"}} onClick={() => validerRDV(item.id)} >Valider</Link></li>
                      <li><Link className="dropdown-item" style={{textDecoration: "none"}} onClick={() => refuserRDV(item.id)}>Refuser</Link></li>
                      <li><Link className="dropdown-item" style={{textDecoration: "none"}} onClick={() => getDataRendezVous(item.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">Modifier</Link></li>
                    </ul>
                  </div>
                </td>
              </tr>
              )
            }
          )
        )}
     }

     const idRdv = useRef();
     const dateInput = useRef();
     const heureDebutInput = useRef();
     const heureFinInput = useRef();

    const reporterRDV = (e) =>{
      e.preventDefault();
        const idRdvs = idRdv.current.value;
        const dateRDV = dateInput.current.value;
        const heureDebutRDV = heureDebutInput.current.value;
        const heureFinRDV = heureFinInput.current.value;
        console.log(idRdvs, dateRDV, heureDebutRDV, heureFinRDV);
        const data = {
          date: dateRDV,
          heureDebut: heureDebutRDV,
          heureFin: heureFinRDV
        }
        axios.patch(`http://localhost:8000/reporterRDV/${idRdvs}`, data);
        toast.success("Rendez-vous reporter avec succes");
    }

    return ( <>
    <div className='content'>
        <div className="Dashboard section-title"  data-aos="fade-up">
          <h2>Prendre rendez vous</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="text-center" scope="col">#</th>
                <th className="text-center" scope="col">Titre</th>
                <th className="text-center" scope="col">Description</th>
                <th className="text-center" scope="col">Date</th>
                <th className="text-center" scope="col">Heure début</th>
                <th className="text-center" scope="col">Heure fin</th>
              </tr>
            </thead>
            <tbody>
              <ListeRendezVousAValider/>
            </tbody>
          </table>
        </div>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
            <form onSubmit={reporterRDV}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Reporter le Rendez-vous</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <input type="hidden" defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].id : null} ref={idRdv} />
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Date</span>
                                <input type="date" className="form-control" aria-label="Sizing example input" defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].date : null} aria-describedby="inputGroup-sizing-default" ref={dateInput} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Heure début</span>
                                <input type="time" className="form-control" aria-label="Sizing example input" defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].heureDebut : null} aria-describedby="inputGroup-sizing-default" ref={heureDebutInput} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Heure fin</span>
                                <input type="time" className="form-control" aria-label="Sizing example input" defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].heureFin : null} aria-describedby="inputGroup-sizing-default" ref={heureFinInput} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Enregistrer</button>
                        </div>
                    </form>
            </div>
          </div>
        </div>
    </div>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      theme="dark"
    />
    </> );
}
 
export default RendezVous;