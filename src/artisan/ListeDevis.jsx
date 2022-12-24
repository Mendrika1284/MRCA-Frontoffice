/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListeDevis = () => {
    let idArtisan = localStorage.getItem('id');
    const URL = 'http://localhost:8000/listeDevisParArtisan/'+parseInt(idArtisan);

    const [listeDevisArtisan, setListeDevisArtisan] = useState([]);

    useEffect(() => {
        getAllTravaux();
    }, []);

    const getAllTravaux = () => {
        axios.get(URL).then((response) => {
            const allTravaux = response.data.devisArtisan;
            setListeDevisArtisan(allTravaux);
        })
        .catch(error => console.error(`Erreur: ${error}`));
    }


     function ListeDevisFetched(){
        if(listeDevisArtisan?.length > 0){
            return (
                listeDevisArtisan.map((item) => {
                    if(item.etatDevis === 1){
                        return(
                            <tr key={item.idDevis}>
                                <td>{item.idDevis}</td>
                                <td><Link to={`/artisan/detailsDevis/${item.idDevis}`} className="nav-link">{item.nomTypeTravaux}</Link></td>
                                <td>{item.dateCreation}</td>
                                <td>{item.emailClient}</td>
                                <td><Link to={`/artisan/preparerDevis/${item.idDevis}`} className="nav-link"> A Préparer </Link></td>
                            </tr>
                        )
                    }else if(item.etatDevis === 2){
                        return(
                            <tr key={item.idDevis}>
                                <td>{item.idDevis}</td>
                                <td><Link to={`/detailsDevis/${item.idDevis}`}>{item.nomTypeTravaux}</Link></td>
                                <td>{item.dateCreation}</td>
                                <td>{item.emailClient}</td>
                                <td>En attente validation</td>
                            </tr>
                        )
                    }else if(item.etatDevis === 3){
                        return(
                            <tr key={item.idDevis}>
                                <td>{item.idDevis}</td>
                                <td><Link to={`/detailsDevis/${item.idDevis}`}>{item.nomTypeTravaux}</Link></td>
                                <td>{item.dateCreation}</td>
                                <td>{item.emailClient}</td>
                                <td>Validé</td>
                            </tr>
                        )
                    }else if(item.etatDevis === 4){
                        return(
                            <tr key={item.idDevis}>
                                <td>{item.idDevis}</td>
                                <td><Link to={`/detailsDevis/${item.idDevis}`}>{item.nomTypeTravaux}</Link></td>
                                <td>{item.dateCreation}</td>
                                <td>{item.emailClient}</td>
                                <td>Refusé</td>
                            </tr>
                        )
                    }
                    return null;
                    }
                )
            )
        }
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
                <th scope="col">Email Client</th>
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