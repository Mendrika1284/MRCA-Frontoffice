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

const DetailsDevis = () => {
    let { id } = useParams();

    const [detailDevis, setDetailDevis] = useState(null);

    useEffect(() => {
        getDetailDevis();
    }, []);

    const getDetailDevis = () => {
        axios
          .get("http://localhost:8000/visualiserDevisClient/" + parseInt(id))
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
const mapRef = useRef();
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);



const mapRef2 = useRef();
const [show2, setShow2] = useState(false);

const handleClose2 = () => setShow2(false);
const handleShow2 = () => setShow2(true);

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
                                        <h5 className="card-title">Type travaux: {detailDevis.detailDevis[0].choixTypeTravaux} | {detailDevis.detailDevis[0].nomTypeTravaux}</h5>
                                    <p className="card-text d-flex justify-content-center text-success">Information Client</p>
                                        <p className="text-primary">Nom: {detailDevis.detailClient[0].nomUtilisateur}</p>
                                        <p className="text-primary">Prénom: {detailDevis.detailClient[0].prenomUtilisateur}</p>
                                        <p className="text-primary">Contact: {detailDevis.detailClient[0].contactUtilisateur}</p>
                                        <p className="text-primary">Email: {detailDevis.detailDevis[0].emailClient}</p>
                                    <p className="card-text d-flex justify-content-center text-success">Information Artisan</p>
                                        <p className="text-primary">Nom: {detailDevis.detailArtisan[0].nomArtisan}</p>
                                        <p className="text-primary">Prénom: {detailDevis.detailArtisan[0].prenomArtisan}</p>
                                        <p className="text-primary">Contact: {detailDevis.detailArtisan[0].contactArtisan}</p>
                                        <p className="text-primary">Email: {detailDevis.detailArtisan[0].emailArtisan}</p>
                                        <p className="text-primary">Localisation: <a onClick={handleShow}>Voir</a></p>
                                        <Modal className="d-flex justify-content-center text-success" show={show} onHide={handleClose}>
                                            <Modal.Body>
                                            <MapContainer ref={mapRef} center={[detailDevis.detailArtisan[0].positionXArtisan, detailDevis.detailArtisan[0].positionYArtisan]} zoom={defaultZoom}>
                                            <Marker position={[detailDevis.detailArtisan[0].positionXArtisan, detailDevis.detailArtisan[0].positionYArtisan]} icon={myIcon}>
                                                <Popup>
                                                A pretty CSS3 popup. <br /> Easily customizable.
                                                </Popup>
                                            </Marker>
                                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
                                            </MapContainer>
                                            </Modal.Body>
                                        </Modal>
                                        <p className="text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Voir Plus D'information</p>
                                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Information Artisan</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <p className="text-primary">Status juridique: {detailDevis.detailArtisan[0].statusJuridiqueArtisan}</p>
                                                <p className="text-primary">SIRET: {detailDevis.detailArtisan[0].siretArtisan}</p>
                                                <p className="text-primary">TVA: {detailDevis.detailArtisan[0].tvaArtisan}</p>
                                                <p className="text-primary">KBIS: {detailDevis.detailArtisan[0].kbisArtisan}</p>
                                                <p className="text-primary">IBAN: {detailDevis.detailArtisan[0].ibanArtisan}</p>
                                                <p className="text-primary">BIC: {detailDevis.detailArtisan[0].bicArtisan}</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    <p className="card-text d-flex justify-content-center text-success">Information Devis</p>
                                        <p className="text-primary">Localisation: <a onClick={handleShow2}>Voir</a></p>
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
                                        <p className="text-primary">Date demande: {detailDevis.detailDevis[0].dateCreation}</p>
                                        <p className="text-primary">Montant: {detailDevis.detailDevis[0].montant} Ariary</p>
                                        <div className="d-flex justify-content-center"><Link to="/client/listedevis"><button className="btn btn-outline-danger">Retour</button></Link></div>
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
 
export default DetailsDevis;