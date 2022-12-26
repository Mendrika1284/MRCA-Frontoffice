/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link, useNavigate, useParams } from "react-router-dom";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './_styles/map.css';

const PreparerDevis = () => {
    let { id } = useParams();

    const [detailDevis, setDetailDevis] = useState(null);

    useEffect(() => {
        getDetailDevis();
    }, []);

    const getDetailDevis = () => {
        axios
          .get("http://localhost:8000/visualiserDevisArtisanApreparer/" + parseInt(id))
          .then((response) => {
            const devisClient = response.data;
            setDetailDevis(devisClient);
          })
          .catch((error) => {
            console.error(`Erreur: ${error}`);
          });
      };
    const styles = {
        width: '30rem'
      };

const mapRef = useRef();

const defaultZoom = 12;

//Icon
var myIcon = L.icon({
	iconUrl: 'assets/img/marker/devisMarker.png',
	iconSize: [25, 45],
	iconAnchor: [12, 45],
	popupAnchor: [-3, -76],
	shadowSize: [68, 95],
	shadowAnchor: [22, 94]
});

//Popup
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

//PreparerDevis
const [isClicked, setIsClicked] = useState(false);
const [montant, setMontant] = useState("");

const changeMontant = (e) => {
    setIsClicked(true);
}

function changeMontantValue(event) {
    setMontant(event.target.value);
}

function updateMontant(id, data) {
    return axios.patch(`http://localhost:8000/preparerDevis/${id}/${montant}`, null);
  }

let navigate = useNavigate();
const preparerDevis = (e) => {
    e.preventDefault();
    console.log(montant);
    updateMontant(id)
    .then((response) => {
            navigate(`../../artisan/pdf/${id}`);
      })
      .catch((error) => {
        // Handle error
      });

  };

    return ( 
        <div className="content container d-flex justify-content-center">
            <div className="card" style={styles}>
            <div className="card-body">
                {
                    detailDevis ? (
                        <div>
                            {
                                detailDevis ? (
                                    <div>
                                        <h5 className="card-title">Type travaux: {detailDevis.detailDevis[0].nomTypeTravaux}</h5>
                                        <p className="card-text d-flex justify-content-center text-success">Information Client</p>
                                        <p className="text-primary">Nom: {detailDevis.detailUtilisateur[0].nomUtilisateur}</p>
                                        <p className="text-primary">Prénom: {detailDevis.detailUtilisateur[0].prenomUtilisateur}</p>
                                        <p className="text-primary">Contact: {detailDevis.detailUtilisateur[0].contactUtilisateur}</p>
                                        <p className="text-primary">Email: {detailDevis.detailDevis[0].emailClient}</p>
                                        <p className="card-text d-flex justify-content-center text-success">Information Devis</p>
                                        <p className="text-primary">Localisation: <a onClick={handleShow}>Voir</a></p>
                                        <Modal className="d-flex justify-content-center text-success" show={show} onHide={handleClose}>
                                            <Modal.Body>
                                            <MapContainer ref={mapRef} center={[detailDevis.detailDevis[0].devisPositionX, detailDevis.detailDevis[0].devisPositionY]} zoom={defaultZoom}>
                                            <Marker position={[detailDevis.detailDevis[0].devisPositionX, detailDevis.detailDevis[0].devisPositionY]} icon={myIcon}>
                                                <Popup>
                                                A pretty CSS3 popup. <br /> Easily customizable.
                                                </Popup>
                                            </Marker>
                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
                                            </MapContainer>
                                            </Modal.Body>
                                        </Modal>
                                        <p className="text-primary">Date demande: {detailDevis.detailDevis[0].dateCreation}</p>
                                        <p className="text-primary">Date debut estimé: {detailDevis.detailDevis[0].dateDebut}</p>
                                        <p className="text-primary">Date fin estimé: {detailDevis.detailDevis[0].dateFin}</p>
                                    <form onSubmit={preparerDevis}>
                                    {
                                        isClicked ? (
                                            <div className="col-xs-2 mb-4">
                                                <label htmlFor="montant" className="text-primary">Montant:</label>
                                                <input type="text" id="montant" className="form-control" value={montant} onChange={changeMontantValue} />
                                            </div>
                                        ) : (
                                            <p className="text-primary" onClick={changeMontant}>Montant: {detailDevis.detailDevis[0].montant} Ariary</p>
                                        )
                                    }
                                        <div className="d-flex justify-content-center btn-group">
                                            <button type="submit" className="btn btn-outline-success me-4">Préparer</button>
                                            <Link to="/artisan/listeDevis"><button className="btn btn-outline-danger">Retour</button></Link>
                                        </div>
                                    </form>
                                    </div>
                                ) : (
                                    <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                )
                            }
                        </div>
                    ) : (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    )
                }
            </div>
            </div>
        </div>
     );
}
 
export default PreparerDevis;