/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./_styles/ListeDevis.css";

const ListeDevis = () => {
    let email = localStorage.getItem('email');
    const URL = 'http://localhost:8000/receptionDevis/'+email;

    const [listeDevisClient, setListeDevisClient] = useState([]);

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
      return window.location.reload();
    }

    function refuserDevis(id) {
      axios.patch(`http://localhost:8000/refuserDevis/${id}`, null);
      return window.location.reload();
    }

    function ListeDevisFetched(){
        if(listeDevisClient?.length > 0){
          return (
            listeDevisClient.map((item) => {
                return(
                  <tr key={item.idDevis}>
                    <td>{item.idDevis}</td>
                    <td>
                      {
                      item.etatDevis === 1 || item.etatDevis === 0 ? (
                        <p>{item.nomTypeTravaux}</p>
                      ) : (
                        <Link style={{ textDecoration: 'none' }} to={`/client/detailsDevis/${item.idDevis}`}>{item.nomTypeTravaux}</Link>
                      )
                      }
                    </td>
                    <td>{item.dateCreation}</td>
                    <td>
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
                      ) : null
                      }
                    </td>
                    {
                    item.etatDevis === 2 ? (
                        <><td>
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
                        <td><Link style={{ textDecoration: 'none' }} className="text-info" to={`/client/demanderIntervention/${item.idDevis}`}>Supprimer</Link></td>
                      </>
                    ): null}
                  </tr>
                )
            }
          )
        )}
      }


    return ( 
        <div className='content container d-flex justify-content-center'>
        <div className="Dashboard section-title"  data-aos="fade-up">
          <h2>Liste de mes devis</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Intitulé</th>
                <th scope="col">Date demande</th>
                <th scope="col">Etat</th>
              </tr>
            </thead>
            <tbody>
                <ListeDevisFetched />
            </tbody>
          </table>
        </div>
    </div>
     );
}
 
export default ListeDevis;