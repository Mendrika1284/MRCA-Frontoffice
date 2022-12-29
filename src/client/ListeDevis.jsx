/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
                      {item.etatDevis === 1 ? (
                        <Link to={`/client/preparerDevis/${item.idDevis}`} className="nav-link"> A Préparer </Link>
                      ) : (
                        <Link to={`/client/detailsDevis/${item.idDevis}`}>{item.nomTypeTravaux}</Link>
                      )}
                    </td>
                    <td>{item.dateCreation}</td>
                    <td>
                      {
                      item.etatDevis === 0 ? (
                        "A Assigner"
                      ) :item.etatDevis === 1 ? (
                        "A Préparer"
                      ) : item.etatDevis === 2 ? (
                        "En attente validation"
                      ) : item.etatDevis === 3 ? (
                        "Validé"
                      ) : item.etatDevis === 4 ? (
                        "Refusé"
                      ) : null}
                    </td>
                    {item.etatDevis === 2 ? (
                        <><td>
                            <Link to={`/client/validerDevis/${item.idDevis}`}>Valider</Link>
                          </td>
                          <td><Link to={`/client/telechargerDevis/${item.idDevis}`}>Télécharger</Link>
                          </td></>
                    ) : null}
                  </tr>
                )
            }
          )
        )}
      }


    return ( 
        <div className='content'>
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