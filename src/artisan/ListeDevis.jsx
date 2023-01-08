/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ListeDevis = () => {
    let idUtilisateur = localStorage.getItem('id');
    let idArtisan = localStorage.getItem('idArtisan');
    const URL = 'http://localhost:8000/listeDevisParArtisan/'+parseInt(idUtilisateur);

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

    const optionsDate = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };


     function ListeDevisFetched(){
        if(listeDevisArtisan?.length > 0){
            return (
                listeDevisArtisan.map((item) => {
                    if(item.etatDevis === 1){
                        return(
                            <tr key={item.idDevis}>
                                <td>{item.idDevis}</td>
                                <td><Link to={`/artisan/detailsDevis/${item.idDevis}`} className="nav-link">{item.nomTypeTravaux}</Link></td>
                                <td>{new Date(item.dateCreation).toLocaleDateString("fr-FR", optionsDate)}</td>
                                <td>{item.emailClient}</td>
                                <td><Link to={`/artisan/preparerDevis/${item.idDevis}`} className="nav-link"> A Préparer </Link></td>
                            </tr>
                        )
                    }else if(item.etatDevis === 2){
                        return(
                            <tr key={item.idDevis}>
                                <td>{item.idDevis}</td>
                                <td><Link to={`/artisan/detailsDevis/${item.idDevis}`}>{item.nomTypeTravaux}</Link></td>
                                <td>{new Date(item.dateCreation).toLocaleDateString("fr-FR", optionsDate)}</td>
                                <td>{item.emailClient}</td>
                                <td>En attente validation</td>
                                <td><Link to={`/artisan/telechargerDevis/${item.idDevis}`}>Télécharger</Link></td>
                            </tr>
                        )
                    }else if(item.etatDevis === 3){
                        return(
                            <tr key={item.idDevis}>
                                <td>{item.idDevis}</td>
                                <td><Link to={`/artisan/detailsDevis/${item.idDevis}`}>{item.nomTypeTravaux}</Link></td>
                                <td>{new Date(item.dateCreation).toLocaleDateString("fr-FR", optionsDate)}</td>
                                <td>{item.emailClient}</td>
                                <td>Validé</td>
                            </tr>
                        )
                    }else if(item.etatDevis === 4){
                        return(
                            <tr key={item.idDevis}>
                                <td>{item.idDevis}</td>
                                <td><Link to={`/artisan/detailsDevis/${item.idDevis}`}>{item.nomTypeTravaux}</Link></td>
                                <td>{new Date(item.dateCreation).toLocaleDateString("fr-FR", optionsDate)}</td>
                                <td>{item.emailClient}</td>
                                <td>Refusé</td>
                            </tr>
                        )
                    }else if(item.etatDevis === 5){
                        return(
                            <tr key={item.idDevis}>
                                <td>{item.idDevis}</td>
                                <td><Link to={`/artisan/detailsDevis/${item.idDevis}`}>{item.nomTypeTravaux}</Link></td>
                                <td>{new Date(item.dateCreation).toLocaleDateString("fr-FR", optionsDate)}</td>
                                <td>{item.emailClient}</td>
                                <td>En attente intervention</td>
                                <td email={item.emailClient} id={item.idDevis} onClick={(e) => handleClickRDV(e)} style={{cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target="#exampleModal">Prendre Rendez-vous</td>
                            </tr>
                        )
                    }
                    return null;
                    }
                )
            )
        }
      }

      const [email, setEmail] = useState();
      const [idDevis, setIdDevis] = useState();

      const handleClickRDV = (event) => {
        const email = event.target.getAttribute('email');
        const id = event.target.getAttribute('id');
        setEmail(email);
        setIdDevis(id);
      }

      const titre = useRef();
      const dateInput = useRef();
      const heureDebutInput = useRef();
      const heureFinInput = useRef();
      const description = useRef();
      let idClient = useRef();

      const prendreRDV = (event) => {
        event.preventDefault();

        const dateRDV = dateInput.current.value;
        const heureDebutRDV = heureDebutInput.current.value;
        const heureFinRDV = heureFinInput.current.value;
        const titreRDV = titre.current.value;
        const descriptionRDV = description.current.value;
        const etatRDV = 0;

        axios.get("http://localhost:8000/detailUtilisateur/"+email).then((response) => {
            const id = response.data.detailUtilisateur[0].idUtilisateur;
            idClient = id;
        })
        .catch(error => console.error(`Erreur: ${error}`));

        axios.post('http://localhost:8000/creerRendezVous', {
            idArtisan: parseInt(idArtisan),
            idUtilisateur: parseInt(idClient),
            idDevisClient: idDevis,
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
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
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
                </div>
            </div>
          </div>
    </div>
     );
}
 
export default ListeDevis;