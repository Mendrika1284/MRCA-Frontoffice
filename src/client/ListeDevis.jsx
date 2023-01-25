/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./_styles/ListeDevis.css";
import { ToastContainer, toast } from 'react-toastify';

const ListeDevis = () => {
    let email = localStorage.getItem('email');
    const URL = 'http://localhost:8000/receptionDevis/'+email;

    const [listeDevisClient, setListeDevisClient] = useState([]);
    const [devisClient, setDevisClient] = useState([]);
    const [detailRendezVous, setDetailRendezVous] = useState();

    useEffect(() => {
        getAllTravaux();
    }, []);

    const getAllTravaux = () => {
        axios.get(URL).then((response) => {
            const allTravaux = response.data.devisClient;
            setListeDevisClient(allTravaux);
        })
        .catch(error => console.error(`Erreur: ${error}`));
    }

    function validerDevis(id) {
      axios.patch(`http://localhost:8000/validerDevis/${id}`, null);
      toast.success("Devis valider avec succes");
    }

    function refuserDevis(id) {
      axios.patch(`http://localhost:8000/refuserDevis/${id}`, null);
      toast.warning("Devis refuser");
    }

    function supprimerDevis(id) {
      axios.delete(`http://localhost:8000/supprimerDevis/${id}`, null)
        .then((response) => {
          if (response.status === 204) {
            setListeDevisClient(listeDevisClient.filter((item) => item.idDevis !== id));
            toast.warning("Devis supprimer");
          }
        })
        .catch((error) => {
        });
    }

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    // tokony manao verification rehefa misy le rendez_vous dia tsy maka tsony, sinon maka rendez_vous
    const getDataRendezVous = (id) => {
      axios.get("http://localhost:8000/getRendezVousFromListeDevis/"+id).then((response) => {
        const allTravaux = response.data.rendez_vous;
        console.log(allTravaux);
        setDetailRendezVous(allTravaux);
    })
    .catch(error => console.error(`Erreur: ${error}`));

      axios.get("http://localhost:8000/devisClientById/"+id).then((response) => {
        const allTravaux = response.data.devisClient;
        console.log(allTravaux);
        setDevisClient(allTravaux);
      })
      .catch(error => console.error(`Erreur: ${error}`));
  }

    function ListeDevisFetched(){
        if(listeDevisClient?.length > 0){
          return (
            listeDevisClient.map((item) => {
                return(
                  <tr key={item.idDevis}>
                    <td className="text-center">{item.idDevis}</td>
                    <td className="text-center">
                      {
                      item.etatDevis === 1 || item.etatDevis === 0 ? (
                        <p>{item.nomTypeTravaux}</p>
                      ) : (
                        <Link style={{ textDecoration: 'none' }} to={`/client/detailsDevis/${item.idDevis}`}>{item.nomTypeTravaux}</Link>
                      )
                      }
                    </td>
                    <td className="text-center">{new Date(item.dateCreation).toLocaleDateString("fr-FR", options)}</td>
                    <td className="text-center">
                      {
                      item.etatDevis === 0 ? (
                        <p className="text-warning">En attente responsable</p>
                      ) :item.etatDevis === 1 ? (
                        <p className="text-warning">En attente de preparation</p>
                      ) : item.etatDevis === 2 ? (
                        <p className="text-warning">En attente de votre validation</p>
                      ) : item.etatDevis === 3 ? (
                        <p className="text-success">Validé</p>
                      ) : item.etatDevis === 4 ? (
                        <p className="text-danger">Refusé</p>
                      ) : item.etatDevis === 5 ? (
                        <p className="text-info">En attente validation pour intervention</p>
                      ) : null
                      }
                    </td>
                    {
                    item.etatDevis === 2 ? (
                        <><td className="text-center">
                            <div className="btn-group dropend">
                            <button type="button" className="btn btn-info btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Action
                            </button>
                            <ul className="dropdown-menu">
                                <li><p onClick={() => validerDevis(`${item.idDevis}`)}>Valider</p></li>
                                <li><p onClick={() => refuserDevis(`${item.idDevis}`)}>Refuser</p></li>
                                <li><Link style={{ textDecoration: 'none' }} to={`/client/telechargerDevis/${item.idDevis}`}>Télécharger</Link></li>
                            </ul>
                            </div>
                          </td>
                        </>
                    ) : item.etatDevis === 3 ? (
                      <>
                        <td><Link style={{ textDecoration: 'none' }} className="text-info" to={`/client/demanderIntervention/${item.idDevis}`}>Demander Intervention</Link></td>
                      </>
                    ): item.etatDevis === 4 || item.etatDevis === 1 || item.etatDevis === 0 ? (
                      <>
                        <td><p className="text-danger" onClick={() => supprimerDevis(`${item.idDevis}`)}>Supprimer</p></td>
                      </>
                    ): item.etatDevis === 5 ? (
                      <>
                        <td><p className="text-info" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getDataRendezVous(`${item.idDevis}`,``)}>Prendre rendez vous</p></td>
                      </>
                    ): null}
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

     const validerRDV = (id) => {
      axios.patch(`http://localhost:8000/validerRendezVousByClient/${id}`, null)
        .then(response => {
          setDetailRendezVous(response.data.rendez_vous);
          toast.success("Rendez-vous valider avec succes");
        })
        .catch(error => {
          console.log(error);
        });
    }
    
    const refuserRDV = (id) => {
      axios.patch(`http://localhost:8000/refuserRendezVousByClient/${id}`, null)
        .then(response => {
          setDetailRendezVous(response.data.rendez_vous);
          toast.error("Rendez-vous annuler");
        })
        .catch(error => {
          console.log(error);
        });
    }

      const titre = useRef();
      const description = useRef();

      const prendreRDV = (event) => {
        event.preventDefault();

        const dateRDV = dateInput.current.value;
        const heureDebutRDV = heureDebutInput.current.value;
        const heureFinRDV = heureFinInput.current.value;
        const titreRDV = titre.current.value;
        const descriptionRDV = description.current.value;
        const etatRDV = 0;


        axios.post('http://localhost:8000/creerRendezVous', {
            idArtisan: parseInt(devisClient[0].idArtisan),
            idUtilisateur: parseInt(localStorage.getItem("id")),
            idDevisClient: parseInt(devisClient[0].idDevis),
            date: dateRDV,
            heureDebut: heureDebutRDV,
            heureFin: heureFinRDV,
            etat: etatRDV,
            titre: titreRDV,
            description: descriptionRDV
          })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    };

    return ( 
        <div className='content'>
          <div className="Dashboard section-title"  data-aos="fade-up">
              <h2>Liste de mes devis</h2>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center" scope="col">#</th>
                    <th className="text-center" scope="col">Intitulé</th>
                    <th className="text-center" scope="col">Date demande</th>
                    <th className="text-center" scope="col">Etat</th>
                  </tr>
                </thead>
                <tbody>
                    <ListeDevisFetched />
                </tbody>
              </table>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  {
                    detailRendezVous && detailRendezVous.length > 0 && detailRendezVous[0].etat === 0 ?
                    (<>
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
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-success" onClick={() => validerRDV(detailRendezVous[0].id)} data-bs-dismiss="modal">Valider</button>
                            <button type="button" className="btn btn-danger" onClick={() => refuserRDV(detailRendezVous[0].id)} data-bs-dismiss="modal">Refuser</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Reporter</button>
                        </div>
                      </form>
                    </>) : detailRendezVous && detailRendezVous.length > 0 && (detailRendezVous[0].etat === 1 || detailRendezVous[0].etat === 6) ? (<>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Detail Rendez-Vous: Validé</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <input type="hidden" defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].id : null} ref={idRdv} readOnly />
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Date</span>
                                <input type="date" className="form-control" aria-label="Sizing example input" readOnly defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].date : null} aria-describedby="inputGroup-sizing-default" ref={dateInput} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Heure début</span>
                                <input type="time" className="form-control" aria-label="Sizing example input" readOnly defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].heureDebut : null} aria-describedby="inputGroup-sizing-default" ref={heureDebutInput} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Heure fin</span>
                                <input type="time" className="form-control" aria-label="Sizing example input" readOnly defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].heureFin : null} aria-describedby="inputGroup-sizing-default" ref={heureFinInput} />
                            </div>
                        </div>
                    </>): detailRendezVous && detailRendezVous.length > 0 && (detailRendezVous[0].etat === 2 || detailRendezVous[0].etat === 7) ? (<>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Detail Rendez-Vous: Refuser</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <input type="hidden" defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].id : null} ref={idRdv} />
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Date</span>
                                <input type="date" className="form-control" aria-label="Sizing example input" readOnly defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].date : null} aria-describedby="inputGroup-sizing-default" ref={dateInput} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Heure début</span>
                                <input type="time" className="form-control" aria-label="Sizing example input" readOnly defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].heureDebut : null} aria-describedby="inputGroup-sizing-default" ref={heureDebutInput} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Heure fin</span>
                                <input type="time" className="form-control" aria-label="Sizing example input" readOnly defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].heureFin : null} aria-describedby="inputGroup-sizing-default" ref={heureFinInput} />
                            </div>
                        </div>
                    </>): detailRendezVous && detailRendezVous.length > 0 && (detailRendezVous[0].etat === 5) ? (<>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Detail Rendez-Vous: Attente validation artisan</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <input type="hidden" defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].id : null} ref={idRdv} />
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Date</span>
                                <input type="date" className="form-control" aria-label="Sizing example input" readOnly defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].date : null} aria-describedby="inputGroup-sizing-default" ref={dateInput} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Heure début</span>
                                <input type="time" className="form-control" aria-label="Sizing example input" readOnly defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].heureDebut : null} aria-describedby="inputGroup-sizing-default" ref={heureDebutInput} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Heure fin</span>
                                <input type="time" className="form-control" aria-label="Sizing example input" readOnly defaultValue={detailRendezVous && detailRendezVous.length > 0 ? detailRendezVous[0].heureFin : null} aria-describedby="inputGroup-sizing-default" ref={heureFinInput} />
                            </div>
                        </div>
                    </>):(<>
                      <form onSubmit={prendreRDV}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Prendre Rendez-vous</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Titre</span>
                                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ref={titre} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Date</span>
                                <input type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ref={dateInput} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Heure début</span>
                                <input type="time" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ref={heureDebutInput} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Heure fin</span>
                                <input type="time" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ref={heureFinInput} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="inputGroup-sizing-default">Description</span>
                                <textarea className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" ref={description} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Enregistrer</button>
                        </div>
                    </form>
                    </>)
                  }
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
        </div>
     );
}
 
export default ListeDevis;