/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../artisan/_styles/map.css';
import { Player } from '@lottiefiles/react-lottie-player';

const DemandeIntervention = () => {
    let { id } = useParams();

    const [detailDevis, setDetailDevis] = useState(null);

    useEffect(() => {
        getDetailDevis();
    }, []);

    const getDetailDevis = () => {
        axios
          .get("http://localhost:8000/receptionDevisParId/" + parseInt(id))
          .then((response) => {
            const devisClient = response.data;
            setDetailDevis(devisClient);
          })
          .catch((error) => {
            console.error(`Erreur: ${error}`);
          });
      };
    const styles = {
        width: '40rem'
      };

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
const mapRef2 = useRef();
const [show2, setShow2] = useState(false);

const handleClose2 = () => setShow2(false);
const handleShow2 = () => setShow2(true);

//Calcul distance entre client et artisan
const EARTH_RADIUS = 6371;

function calculateDistance(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  lat1 = lat1 * (Math.PI / 180);
  lat2 = lat2 * (Math.PI / 180);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_RADIUS * c;

  return distance.toFixed(2);
}

const [idDevisTravaux, setIdDevisTravaux] = useState(0);
const [idArtisan, setIdArtisan] = useState(0);
const [idClient, setIdClient] = useState(0);
const [distanceClientArtisan, setDistanceClientArtisan] = useState('');
const [description, setDescription] = useState('');
const [intervention, setIntervention] = useState(false);

useEffect(() => {
    axios
      .get('http://localhost:8000/receptionDevisParId/' + parseInt(id))
      .then
(response => {
    const detailDevis = response.data;
    setIdDevisTravaux(detailDevis.detailDevis[0].idDevis);
    setIdArtisan(detailDevis.detailArtisan[0].idArtisan);
    setIdClient(detailDevis.detailClient[0].idUtilisateur);
    setDistanceClientArtisan(calculateDistance(
    detailDevis.detailArtisan[0].positionXArtisan,
    detailDevis.detailArtisan[0].positionYArtisan,
    detailDevis.detailDevis[0].devisPositionX,
    detailDevis.detailDevis[0].devisPositionY
    ));
    })
    .catch(error => {
    console.error(`Erreur: ${error}`);
    });
}, []);

let toStringIdDevisTravaux = String("/apiplatform/devis_clients/"+String(idDevisTravaux));
let toStringIdArtisan = String("/apiplatform/artisans/"+String(idArtisan));
let toStringIdClient = String("/apiplatform/utilisateurs/"+String(idClient));

const getDescription = (event) => {
    setDescription(event.target.value);
};
const submitFormData = (e) => {
    e.preventDefault();
    const data = {
        "idDevisClient": toStringIdDevisTravaux,
        "idArtisan": toStringIdArtisan,
        "description": description,
        "distanceClientArtisan": distanceClientArtisan,
        "idUtilisateur": toStringIdClient
    };
    console.log(data);

    axios.post('http://localhost:8000/apiplatform/interventions', data
      )
        .then(res => {
            axios.patch(`http://localhost:8000/setDemandeDevisEtat/${id}`, null);
            setIntervention(true);
        })
        .catch(error => {
            setIntervention(false);
        });
  };


    return ( 
        <div className="content container d-flex justify-content-center">
            <div className="card" style={styles}>
            <div className="card-body">
            {
                    intervention === true ? (
                        <div>
                            <Player  src='https://assets4.lottiefiles.com/packages/lf20_xwmj0hsk.json' style={{width: 300}} className="player" loop autoplay />
                        </div>
                    ) : (
                        <>
                        {
                            detailDevis ? (
                                <div>
                                    {
                                        detailDevis ? (
                                            <div>
                                                <h5 className="card-title">Type travaux: {detailDevis.detailDevis[0].choixTypeTravaux} | {detailDevis.detailDevis[0].nomTypeTravaux}</h5>
                                            <p className="card-text d-flex justify-content-center text-success">Information Client</p>
                                                <p className="text-secondary">Nom: {detailDevis.detailClient[0].nomUtilisateur}</p>
                                                <p className="text-secondary">Prénom: {detailDevis.detailClient[0].prenomUtilisateur}</p>
                                                <p className="text-secondary">Contact: {detailDevis.detailClient[0].contactUtilisateur}</p>
                                                <p className="text-secondary">Email: {detailDevis.detailDevis[0].emailClient}</p>
                                            <p className="card-text d-flex justify-content-center text-success">Information Artisan</p>
                                                <p className="text-secondary">Nom: {detailDevis.detailArtisan[0].nomArtisan}</p>
                                                <p className="text-secondary">Prénom: {detailDevis.detailArtisan[0].prenomArtisan}</p>
                                                <p className="text-secondary">Email: {detailDevis.detailArtisan[0].emailArtisan}</p>
                                            <p className="card-text d-flex justify-content-center text-success">Information Devis</p>
                                                <p className="text-secondary">Localisation: <a onClick={handleShow2}>Voir</a></p>
                                                <Modal className="d-flex justify-content-center text-success" show={show2} onHide={handleClose2}>
                                                    <Modal.Body>
                                                    <MapContainer ref={mapRef2} center={[detailDevis.detailDevis[0].devisPositionX, detailDevis.detailDevis[0].devisPositionY]} zoom={defaultZoom}>
                                                    <Marker position={[detailDevis.detailDevis[0].devisPositionX, detailDevis.detailDevis[0].devisPositionY]} icon={myIcon}>
                                                        <Popup>
                                                            A pretty CSS3 popup. <br /> Easily customizable.
                                                        </Popup>
                                                    </Marker>
                                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
                                                    </MapContainer>
                                                    </Modal.Body>
                                                </Modal>
                                                <p className="text-secondary">Date demande: {detailDevis.detailDevis[0].dateCreation}</p>
                                                <p className="text-secondary">Distance entre vous et le professionnel: {calculateDistance(detailDevis.detailArtisan[0].positionXArtisan, detailDevis.detailArtisan[0].positionYArtisan,
                                           detailDevis.detailDevis[0].devisPositionX, detailDevis.detailDevis[0].devisPositionY)} km</p>
                                                <p className="text-secondary">Détail dévis: {detailDevis.detailDevis[0].detailDevis}</p>
                                                <form onSubmit={submitFormData}>
                                                <div className="form-group row">
                                                    <label htmlFor="exampleFormControlTextarea1" className="form-label col-sm-4"><p className="text-secondary">Détail sur l'intervention</p></label>
                                                    <div className="col-sm-8">
                                                        <textarea className="form-control" defaultValue={description} onChange={getDescription} id="exampleFormControlTextarea1" rows="3"></textarea>
                                                    </div>
                                                </div>
                                                <div className="btn-group">
                                                    <button style={{marginLeft: '200px'}} type="submit" className="btn btn-outline-success">Valider</button>
                                                    <Link to="/client/listedevis"><button style={{marginLeft: '20px'}} className="btn btn-outline-danger">Retour</button></Link>
                                                </div>
                                                </form>
                                            </div>
                                        ) : (
                                            <div className="d-flex justify-content-center">
                                            <div className="spinner-border text-secondary" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        )
                                    }
                                </div>
                            ) : (
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border text-secondary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            )
                        }
                        </>
                    )
            }
            </div>
            </div>
        </div>
     );
}
 
export default DemandeIntervention;