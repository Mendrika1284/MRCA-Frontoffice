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

    console.log(listeDevisClient);

    function ListeDevisFetched(){
        if(listeDevisClient?.length > 0){
          return (
            listeDevisClient.map((item) => {
                return(
                  <tr key={item.idDevis}>
                    <td>{item.idDevis}</td>
                    <td>
                      {item.etatDevis === 1 || item.etatDevis === 0 ? (
                        <p>{item.nomTypeTravaux}</p>
                      ) : (
                        <Link style={{ textDecoration: 'none' }} to={`/client/detailsDevis/${item.idDevis}`}>{item.nomTypeTravaux}</Link>
                      )}
                    </td>
                    <td>{item.dateCreation}</td>
                    <td>
                      {
                      item.etatDevis === 0 ? (
                        "En attente responsable"
                      ) :item.etatDevis === 1 ? (
                        "En attente de preparation"
                      ) : item.etatDevis === 2 ? (
                        "En attente de votre validation"
                      ) : item.etatDevis === 3 ? (
                        "Validé"
                      ) : item.etatDevis === 4 ? (
                        "Refusé"
                      ) : null}
                    </td>
                    {item.etatDevis === 2 ? (
                        <><td>
                            <div className="btn-group dropend">
                            <button type="button" className="btn btn-info btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Action
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link style={{ textDecoration: 'none' }} to={`/client/validerDevis/${item.idDevis}`}>Valider</Link></li>
                                <li><Link style={{ textDecoration: 'none' }} to={`/client/telechargerDevis/${item.idDevis}`}>Télécharger</Link></li>
                            </ul>
                            </div>
                          </td>
                        </>
                    ) : null}
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